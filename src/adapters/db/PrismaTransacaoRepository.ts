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

    async findById(transactionId: string): Promise<Transacao | null> {
        const transacao = await this.prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        return transacao ? this.toTransacao(transacao) : null
    }

    async findByDate(userId: string, mes: number, ano: number): Promise<Transacao[]> {
        const startDate = new Date(ano, mes - 1, 1)
        const endDate = new Date(ano, mes, 1)

        const records = await this.prisma.transaction.findMany({
            where: {
                userId,
                data: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        })

        return records.map(this.toTransacao)
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