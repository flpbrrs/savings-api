import { NextFunction, Request, Response } from "express";
import JWTTokenGenerator from "../../adapters/auth/JWTTokenGenerator";
import UserRepository from "../../core/auth/providers/UserRepository";
import { User } from "../../core/auth/model/User";

interface RequestUser extends User {
    iat: number,
    exp: number
}

export default function AuthMiddleware(
    repository: UserRepository,
    tokenProvider: JWTTokenGenerator
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const AcessoNegado = (message: string) => response.status(403).json({ erro: true, message })
        try {
            const token = request.headers['authorization']?.replace('Bearer ', '')
            if (!token) {
                AcessoNegado('Usuário não autorizado')
                return;
            }

            const userToken = tokenProvider.decode(token) as RequestUser

            let dataExpiracao = userToken.exp
            let dataAtual = (Date.now() / 1000) | 0

            if (dataAtual > dataExpiracao) {
                AcessoNegado('Token expirado')
                return;
            }

            const user = await repository.findByEmail(userToken.email)

            if (!user) {
                AcessoNegado('Usuário não autorizado')
                return;
            }

            (request as any).user = user

            next()
        } catch (e: any) {
            AcessoNegado('Usuário não autorizado')
        }
    }
}