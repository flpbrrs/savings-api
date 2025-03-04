import { User } from "../../auth/model/User";
import CasoDeUso from "../../shared/model/CasoDeUso";
import Resumo from "../model/Resumo";
import TransacaoRepository from "../providers/transacaoRepository";

export default class ObterResumo implements CasoDeUso<string, Resumo> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(userId: string, usuario?: User): Promise<Resumo> {
        return await this.repository.gerarResumo(userId)
    }
}