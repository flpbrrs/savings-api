import Extrato from "../model/Extrato";
import TransacaoRepository from "../providers/transacaoRepository";
import ObterTransacoesPorPeriodo from "../services/obterTransacoes";
import {
    ObterExtratoRequest,
    ObterExtratoResponse
} from "./dto"

export default class TransacaoFacade {
    private obterTransacoesUseCase: ObterTransacoesPorPeriodo

    constructor(
        repository: TransacaoRepository
    ) {
        this.obterTransacoesUseCase = new ObterTransacoesPorPeriodo(repository)
    }

    async obterExtrato(dto: ObterExtratoRequest): Promise<ObterExtratoResponse> {
        const transacoes = await this.obterTransacoesUseCase.execute(
            { mes: dto.mes, ano: dto.ano },
            dto.usuario
        )

        return new Extrato(transacoes).toDto
    }
}