import { User } from "../../auth/model/User";
import { Id } from "../../shared/model/id";
import CasoDeUso from "../../shared/model/CasoDeUso";
import Transacao from "../model/Transacao";
import TransacaoRepository from "../providers/transacaoRepository";

export default class SalvarTransacao implements CasoDeUso<Transacao, void> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(dto: Transacao, usuario?: User): Promise<void> {
        let transacaoExistente = null;
        if (dto.id) {
            transacaoExistente = await this.repository.findById(dto.id);

            if (!transacaoExistente)
                throw new Error("Transação não encontrada para o usuário indicado.")

            if (transacaoExistente && transacaoExistente.userId !== usuario!.id)
                throw new Error("Você não tem permissão para modificar esta transação.")
        }

        await this.repository.salvar({
            ...dto,
            userId: usuario!.id,
            id: dto.id ?? Id.generate(),
            descricao: dto.descricao ?? "Outros"
        })
    }
}