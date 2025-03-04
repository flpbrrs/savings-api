import { PrismaClient, Transaction } from "@prisma/client";
import Resumo from "../../core/transacao/model/Resumo";
import Transacao from "../../core/transacao/model/Transacao";
import TransacaoRepository from "../../core/transacao/providers/transacaoRepository";

export default class PrismaTransacaoRepository implements TransacaoRepository {
    private readonly prisma = new PrismaClient()

    async salvar(transacao: Transacao): Promise<void> {
        await this.prisma.transaction.upsert({
            where: {
                id: transacao.id,
                userId: transacao.userId,
            },
            update: this.fromTransacao(transacao),
            create: this.fromTransacao(transacao)
        })
    }

    async gerarExtrato(userId: string): Promise<Transacao[]> {
        const transacoes = await this.prisma.transaction.findMany({
            where: { userId }
        })

        return transacoes.map(this.toTransacao)
    }

    async gerarResumo(userId: string): Promise<Resumo> {
        const [totals, analytics] = await Promise.all([
            await this.prisma.transaction.groupBy({
                by: ['userId', 'tipo'],
                _sum: { valor: true },
                where: { userId }
            }).then(result => (
                result.reduce((acc: any, item) => {
                    acc[item.tipo] = Number(item._sum.valor);
                    return acc;
                }, {})
            )),
            await this.prisma.transaction.groupBy({
                by: ['descricao'],
                _sum: { valor: true },
                where: { userId, tipo: 'expense' }
            }).then(result =>
                result.reduce((acc: any, item) => {
                    const label = item.descricao.toLowerCase();
                    acc[label] = (acc[label] || 0) + Number(item._sum.valor);
                    return acc;
                }, {})
            )
        ])

        // const totals = await this.prisma.transaction.groupBy({
        //     by: ['userId', 'tipo'],
        //     _sum: { valor: true },
        //     where: { userId }
        // }).then(result => (
        //     result.reduce((acc: any, item) => {
        //         acc[item.tipo] = Number(item._sum.valor);
        //         return acc;
        //     }, {})
        // ))

        // const analytics = await this.prisma.transaction.groupBy({
        //     by: ['descricao'],
        //     _sum: { valor: true },
        //     where: { userId, tipo: 'expense' }
        // }).then(result =>
        //     result.reduce((acc: any, item) => {
        //         const label = item.descricao.toLowerCase();
        //         acc[label] = (acc[label] || 0) + Number(item._sum.valor);
        //         return acc;
        //     }, {})
        // );

        return {
            income: totals.income ?? 0,
            expense: totals.expense ?? 0,
            analytics
        }
    }

    async findById(transactionId: string): Promise<Transacao | null> {
        const transacao = await this.prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        return transacao ? this.toTransacao(transacao) : null
    }

    private fromTransacao(transacao: Transacao) {
        return {
            ...transacao,
            data: new Date(transacao.data).toISOString()
        }
    }

    private toTransacao(transacao: Transaction): Transacao {
        return {
            ...transacao,
            valor: Number(transacao.valor),
        }
    }
}