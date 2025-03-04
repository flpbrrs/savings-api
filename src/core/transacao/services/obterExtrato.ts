import CasoDeUso from "../../shared/model/CasoDeUso";
import Transacao from "../model/Transacao";
import TransacaoRepository from "../providers/transacaoRepository";

export default class ObterExtrato implements CasoDeUso<string, Transacao[]> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(userId: string): Promise<Transacao[]> {
        return await this.repository.gerarExtrato(userId)
    }

}