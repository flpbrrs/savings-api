import { User } from "../model/User";
import DataEncrypter from "../providers/DataEncrypter";
import UserRepository from "../providers/UserRepository";

export default class RegistrarUsuario {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter
    ) { }

    execute({ name, email, senha }: Partial<User>): User {
        if (!name || !email || !senha) {
            throw new Error(
                "Informações insuficientes para criação de um usuário"
            )
        }

        const encryptedSenha = this.encrypter.encrypt(senha)

        let newUser = this.repository.insert({
            id: String(Math.random()),
            name: name,
            email: email,
            senha: encryptedSenha
        })

        return newUser
    }
}