import { User } from "../../auth/model/User";
import CasoDeUso from "../../shared/model/CasoDeUso";
import Transaction from "../model/transaction.entity";
import TransacaoRepository from "../providers/transacaoRepository";

type Entrada = {
    mes: number,
    ano: number
}

export default class ObterTransacoesPorPeriodo implements CasoDeUso<
    Entrada,
    Transaction[]
> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(dto: Entrada, usuario?: User): Promise<Transaction[]> {
        return await this.repository.findByDate(
            usuario!.id,
            dto.mes,
            dto.ano
        )
    }
}