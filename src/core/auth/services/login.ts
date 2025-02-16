import DataEncrypter from "../providers/DataEncrypter";
import { TokenGenerator } from "../providers/TokenGenerator";
import UserRepository from "../providers/UserRepository";

export default class Login {
    constructor(
        private readonly repository: UserRepository,
        private readonly encrypter: DataEncrypter,
        private readonly tokenGenerator: TokenGenerator
    ) { }

    async execute(email: string, senha: string) {
        const user = await this.repository.findByEmail(email)

        if (!user || !this.encrypter.compare(senha, user.senha!)) {
            throw new Error('Credenciais inválidas')
        }

        return this.tokenGenerator.sign(
            { id: user.id, email: user.email },
            { expiresIn: '1d' }
        )
    }
}