import { Express } from "express";
import CoreFacade from "../../adapters/facade/core.facade";

export default class obterExtratoController {
    constructor(
        private readonly app: Express,
        private readonly coreFacade: CoreFacade,
        ...middlewares: any[]
    ) {
        app.get('/transaction/:mes/:ano', ...middlewares, async (request, response) => {
            try {
                const { mes, ano } = request.params
                const transacoes = await coreFacade.transaction.obterExtrato({
                    ano: +ano,
                    mes: + mes,
                    usuario: request.user!
                })
                response.status(200).json(transacoes)
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        })
    }
}