import Transaction from "../model/transaction.entity"

export default interface TransacaoRepository {
    save(transacao: Transaction): Promise<void>
    findByDate(userId: string, mes: number, ano: number): Promise<Transaction[]>
    findById(transactionId: string): Promise<Transaction | null>
}