import { beforeAll, describe, expect, it } from "@jest/globals"
import RegistrarUsuario from '../../src/core/auth/services/registrar-usuario.use-case'
import InMemoryUserRepository from "../../src/adapters/db/InMemoryUserRepository"
import BcryptDataEncrypter from '../../src/adapters/auth/BcryptDataEncrypter'

describe('Casos de uso: Registrar usuário', () => {
    let registerUseCase: RegistrarUsuario
    let memory = new InMemoryUserRepository()

    beforeAll(() => {
        registerUseCase = new RegistrarUsuario(
            memory,
            new BcryptDataEncrypter()
        )
    });

    it('Deve registrar um usuário', async () => {
        let bcryptAdapter = new BcryptDataEncrypter()

        await registerUseCase.execute({
            nome: "Felipe Jonathan",
            email: "felipe@fmail.com",
            senha: "SenhaForte!123"
        })
        let user = InMemoryUserRepository.data[0]

        expect(InMemoryUserRepository.data).toHaveLength(1)
        expect(user).toHaveProperty('id')
        expect(user.nome.nome).toBe("Felipe Jonathan")
        expect(user.email.address).toBe("felipe@fmail.com")
        expect(bcryptAdapter.compare("SenhaForte!123", user.senha?.value!)).toBeTruthy()
    });

    it('Deve gerar erro ao tentar registar um usuário com email em uso', async () => {
        expect(async () => {
            await registerUseCase.execute({
                nome: "Felipe Jonathan",
                email: "felipe@fmail.com",
                senha: "SenhaForte!123"
            })
        }).rejects.toThrowError("root.user-already-exists")
    })

    it('Deve gerar erro ao passar parâmetros insuficientes para criação do usuário', async () => {
        expect(async () => await registerUseCase.execute({} as any))
            .rejects
            .toThrowError("password.empty.weak")
    })
})