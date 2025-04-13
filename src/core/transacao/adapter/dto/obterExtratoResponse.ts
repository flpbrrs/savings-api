import { TransactionProps } from "../../model/transaction.entity";

export interface ObterExtratoResponse {
    total: number,
    income: number,
    expense: number,
    analysis: { name: string, [key: string]: number | string }[],
    transacoes: TransactionProps[]
}