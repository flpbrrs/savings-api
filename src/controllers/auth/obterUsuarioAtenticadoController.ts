import { Express, Request } from "express";

export class ObterUsuarioAutenticadoController {
    constructor(
        private readonly app: Express,
        ...middlewares: any[]
    ) {
        app.post('/me', ...middlewares, async (request, response) => {
            response.status(200).json({
                usuario: { ...request.user, senha: undefined }
            })
        })
    }
}