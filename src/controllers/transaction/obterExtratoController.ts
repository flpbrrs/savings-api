import { Express } from "express";
import ObterExtrato from "../../core/transacao/services/obterExtrato";

export default class obterExtratoController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: ObterExtrato,
        ...middlewares: any[]
    ) {
        app.get('/transaction', ...middlewares, async (request, response) => {
            try {
                const transacoes = await casoDeUso.execute(request.user!.id)
                response.status(200).json(transacoes)
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        })
    }
}