import { Express, Request, Response } from "express";
import SalvarTransacao from "../../core/transacao/services/salvarTransacao";

export class salvarTransacaoController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: SalvarTransacao,
        ...middlewares: any[]
    ) {
        const fn = async (request: Request, response: Response) => {
            const { id } = request.params
            try {
                await casoDeUso.execute(
                    { id, ...request.body },
                    request.user!
                )
                response.status(200).send()
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        }

        app.post('/transaction', ...middlewares, fn)
        app.put('/transaction/:id', ...middlewares, fn)
    }
}