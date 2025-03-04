import { Express } from "express";
import ObterExtrato from "../../core/transacao/services/obterExtrato";

export default class obterExtratoController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: ObterExtrato,
        ...middlewares: any[]
    ) {
        app.get('/transaction/:mes/:ano', ...middlewares, async (request, response) => {
            try {
                const { mes, ano } = request.params
                const transacoes = await casoDeUso.execute(
                    { mes: +mes, ano: +ano },
                    request.user!
                )
                response.status(200).json(transacoes)
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        })
    }
}