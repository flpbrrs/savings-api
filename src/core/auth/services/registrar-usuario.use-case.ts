import CasoDeUso from "../../shared/model/CasoDeUso";
import CoreError from "../../shared/model/CoreError.error";
import StrongPassword from "../model/strong-password.vo";
import User from "../model/user.entity";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";

export type Input = {
    nome: string,
    email: string,
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<Input, void> {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter
    ) { }

    async execute({ nome, email, senha }: Input): Promise<void> {
        const isPasswordWeak = new StrongPassword(senha).validate()

        if (isPasswordWeak) throw isPasswordWeak

        const newUser = new User({
            nome,
            email,
            senha: this.encrypter.encrypt(senha)
        })

        const userAlreadyExists = await this.repository.findByEmail(email)

        if (userAlreadyExists)
            throw new CoreError({ code: "root.user-already-exists" })

        await this.repository.insert(newUser)
    }
}