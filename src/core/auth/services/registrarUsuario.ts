import { Id } from "../../shared/model/id";
import { User } from "../model/User";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";

export default class RegistrarUsuario {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter
    ) { }

    async execute({ name, email, senha }: Partial<User>): Promise<User> {
        if (!name || !email || !senha) {
            throw new Error(
                "Informações insuficientes para criação de um usuário"
            )
        }

        const encryptedSenha = this.encrypter.encrypt(senha)

        let newUser = await this.repository.insert({
            id: Id.generate(),
            name: name,
            email: email,
            senha: encryptedSenha
        })

        return newUser
    }
}