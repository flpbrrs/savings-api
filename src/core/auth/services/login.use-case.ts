import CasoDeUso from "../../shared/model/CasoDeUso";
import CoreError from "../../shared/model/CoreError.error";
import { User } from "../model/User";
import DataEncrypter from "../providers/DataEncrypter";
import { TokenGenerator } from "../providers/TokenGenerator";
import UserRepository from "../providers/UserRepository";

export type Input = {
    email: string,
    senha: string
}

export type Output = {
    usuario: User,
    token: string
}

export default class Login implements CasoDeUso<Input, Output> {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter,
        private readonly tokenGenerator: TokenGenerator
    ) { }

    async execute({ email, senha }: Input): Promise<Output> {
        const user = await this.repository.findByEmail(email)

        if (!user || !this.encrypter.compare(senha, user.senha?.value!))
            throw new CoreError({ code: 'root.invalid-credentials' })

        const token = this.tokenGenerator.sign({
            id: user.id,
            nome: user.nome.nome,
            email: user.email.address
        })

        let userProps = user.withoutPassword

        return {
            usuario: {
                id: userProps.id!,
                nome: userProps.nome!,
                email: userProps.email!
            },
            token
        }
    }
}