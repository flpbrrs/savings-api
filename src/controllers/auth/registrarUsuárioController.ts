import { Express } from "express";
import RegistrarUsuario from "../../core/auth/services/registrar-usuario.use-case";

export class registrarUsuarioController {
    constructor(
        private readonly app: Express,
        private readonly casoDeUso: RegistrarUsuario,
        ...middlewares: any[]
    ) {
        app.post('/register', ...middlewares, async (request, response) => {
            try {
                const { nome, email, senha } = request.body
                const newUser = await casoDeUso.execute({
                    nome, email, senha
                })
                response.status(201).json({
                    usuario: newUser
                })
            } catch (e: any) {
                response.status(400).json({
                    erros: e.message
                })
            }
        })
    }
}