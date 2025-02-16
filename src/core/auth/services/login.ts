import CasoDeUso from "../../shared/model/CasoDeUso";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";
import { TokenGenerator } from "../providers/TokenGenerator";
import { User } from "../model/User";

export type Entrada = {
    email: string,
    senha: string
}

export type Saida = {
    usuario: User,
    token: string
}

export default class Login implements CasoDeUso<Entrada, Saida> {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter,
        private readonly tokenGenerator: TokenGenerator
    ) { }

    async execute({ email, senha }: Entrada): Promise<Saida> {
        const user = await this.repository.findByEmail(email)

        if (!user || !this.encrypter.compare(senha, user.senha!)) {
            throw new Error('Credenciais inválidas')
        }

        const token = this.tokenGenerator.sign({}, { expiresIn: '1d' })

        return {
            usuario: { ...user, senha: undefined },
            token
        }
    }
}