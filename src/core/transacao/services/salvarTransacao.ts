import { User } from "../../auth/model/User";
import CasoDeUso from "../../shared/model/CasoDeUso";
import TransacaoRepository from "../providers/transacaoRepository";
import Transaction, { TransactionProps } from "../model/transaction.entity";

export default class SalvarTransacao implements CasoDeUso<TransactionProps, void> {
    constructor(
        private readonly repository: TransacaoRepository
    ) { }

    async execute(dto: TransactionProps, usuario?: User): Promise<void> {
        let transacaoExistente = null;
        if (dto.id) {
            transacaoExistente = await this.repository.findById(dto.id);

            if (!transacaoExistente)
                throw new Error("Transação não encontrada para o usuário indicado.")

            if (transacaoExistente && transacaoExistente.owner.value !== usuario!.id)
                throw new Error("Você não tem permissão para modificar esta transação.")
        }

        await this.repository.save(new Transaction({
            ...dto,
            owner: usuario!.id,
            descricao: dto.descricao ?? "Outros"
        }))
    }
}