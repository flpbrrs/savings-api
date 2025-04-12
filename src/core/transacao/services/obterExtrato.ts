import { User } from "../../auth/model/User";
import CasoDeUso from "../../shared/model/CasoDeUso";
import Extrato from "../model/Extrato";
import { TransactionProps } from "../model/transaction.entity";
import TransacaoRepository from "../providers/transacaoRepository";

type Entrada = {
    mes: number,
    ano: number
}

type Saida = {
    total: number,
    income: number,
    expense: number,
    analysis: { name: string, [key: string]: number | string }[],
    transacoes: TransactionProps[]
}

export default class ObterExtrato implements CasoDeUso<Entrada, Saida> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(dto: Entrada, usuario?: User): Promise<Saida> {
        const transacoes = await this.repository.findByDate(
            usuario!.id,
            dto.mes,
            dto.ano
        )

        return new Extrato(transacoes).toDto
    }
}