import CasoDeUso from "../../shared/model/CasoDeUso";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";
import { TokenGenerator } from "../providers/TokenGenerator";
import { UserProps } from "../model/user.entity";
import CoreError from "../../shared/model/CoreError.error";

export type Input = {
    email: string,
    senha: string
}

export type Output = {
    usuario: UserProps,
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
            nome: user.nome,
            email: user.email
        })

        return {
            usuario: user.withoutPassword,
            token
        }
    }
}