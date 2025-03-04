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
        throw new Error("Method not implemented.");
    }

    async gerarResumo(userId: string): Promise<Resumo> {
        throw new Error("Method not implemented.");
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
            valor: Number(transacao.valor)
        }
    }
}