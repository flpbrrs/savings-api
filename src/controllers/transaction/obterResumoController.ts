import { Express } from "express";
import ObterResumo from "../../core/transacao/services/obterResumo";

export default class obterResumoController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: ObterResumo,
        ...middlewares: any[]
    ) {
        app.get('/transaction/resume', ...middlewares, async (request, response) => {
            try {
                const resume = await this.casoDeUso.execute(request.user!.id)
                response.status(200).json(resume)
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        })
    }
}