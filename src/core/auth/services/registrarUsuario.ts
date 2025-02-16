import CasoDeUso from "../../shared/model/CasoDeUso";
import { Id } from "../../shared/model/id";
import { User } from "../model/User";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";

export type Entrada = {
    nome: string,
    email: string,
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, User> {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter
    ) { }

    async execute({ nome, email, senha }: Entrada): Promise<User> {
        if (!nome || !email || !senha) {
            throw new Error(
                "Informações insuficientes para criação de um usuário"
            )
        }

        const userAlreadyExists = await this.repository.findByEmail(email)

        if (userAlreadyExists) {
            throw new Error(
                "E-mail já cadastrado"
            )
        }

        const encryptedSenha = this.encrypter.encrypt(senha)

        let newUser = await this.repository.insert({
            id: Id.generate(),
            nome: nome,
            email: email,
            senha: encryptedSenha
        })

        return newUser
    }
}