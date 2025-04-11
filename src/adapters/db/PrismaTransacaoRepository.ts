import { PrismaClient, Transaction as TransactionDb } from "@prisma/client";
import TransacaoRepository from "../../core/transacao/providers/transacaoRepository";
import Transaction from "../../core/transacao/model/transaction.entity";
import { Decimal } from "@prisma/client/runtime/library";

export default class PrismaTransacaoRepository implements TransacaoRepository {
    private readonly prisma = new PrismaClient()

    async save(transaction: Transaction): Promise<void> {
        await this.prisma.transaction.upsert({
            where: {
                id: transaction.id.value,
                userId: transaction.owner.value,
            },
            update: this.toDbModel(transaction),
            create: this.toDbModel(transaction)
        })
    }

    async findById(transactionId: string): Promise<Transaction | null> {
        const transacao = await this.prisma.transaction.findUnique({
            where: { id: transactionId }
        })

        return transacao ? this.fromDbModel(transacao) : null
    }

    async findByDate(
        userId: string,
        mes: number,
        ano: number
    ): Promise<Transaction[]> {
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

        return records.map(this.fromDbModel)
    }

    private toDbModel(transaction: Transaction) {
        return {
            titulo: transaction.props.titulo!,
            descricao: transaction.props.descricao!,
            data: new Date(transaction.props.data!),
            tipo: transaction.props.tipo!,
            valor: new Decimal(transaction.props.valor!),
            userId: transaction.props.owner!
        }
    }

    private fromDbModel(transaction: TransactionDb): Transaction {
        return new Transaction({
            ...transaction,
            valor: Number(transaction.valor),
            data: transaction.data.toISOString(),
            owner: transaction.userId
        })
    }
}