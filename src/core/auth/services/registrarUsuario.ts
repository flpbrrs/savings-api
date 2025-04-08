import CasoDeUso from "../../shared/model/CasoDeUso";
import StrongPassword from "../model/strong-password.vo";
import User from "../model/user.entity";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";

export type Entrada = {
    nome: string,
    email: string,
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, void> {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter
    ) { }

    async execute({ nome, email, senha }: Entrada): Promise<void> {
        const isWeakPassword = new StrongPassword(senha).validate()

        if (isWeakPassword)
            throw isWeakPassword

        const newUser = new User({
            name: nome,
            email,
            password: this.encrypter.encrypt(senha)
        })

        const userAlreadyExists = await this.repository.findByEmail(email)

        if (userAlreadyExists)
            throw new Error("root.user-already-exists")

        await this.repository.insert(newUser.props)
    }
}