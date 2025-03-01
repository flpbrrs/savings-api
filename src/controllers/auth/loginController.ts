import { Express } from "express"
import Login from "../../core/auth/services/login";

export class loginController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: Login,
        ...middlewares: any[]
    ) {
        app.post('/login', async (request, response) => {
            try {
                const { email, senha } = request.body
                const result = await casoDeUso.execute({ email, senha })

                response.status(200).json(result)
            } catch (e: any) {
                response.status(401).json({
                    erros: e.message
                })
            }
        })
    }
}