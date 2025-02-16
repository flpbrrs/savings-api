import { beforeAll, describe, expect, it } from "@jest/globals"
import RegistrarUsuario from '../../src/core/auth/services/registrarUsuario'
import InMemoryUserRepository from "../../src/adapters/db/InMemoryUserRepository"
import BcryptDataEncrypter from '../../src/adapters/auth/BcryptDataEncrypter'

describe('Casos de uso: Registrar usuário', () => {
    let registerUseCase: RegistrarUsuario

    beforeAll(() => {
        registerUseCase = new RegistrarUsuario(
            new InMemoryUserRepository(),
            new BcryptDataEncrypter()
        )
    });

    it('Deve registrar um usuário', async () => {
        let bcryptAdapter = new BcryptDataEncrypter()

        const user = await registerUseCase.execute({
            name: "Felipe Jonathan",
            email: "felipe@fmail.com",
            senha: "123456"
        })

        expect(user).toHaveProperty('id')
        expect(user.name).toBe("Felipe Jonathan")
        expect(user.email).toBe("felipe@fmail.com")
        expect(bcryptAdapter.compare("123456", user.senha!)).toBeTruthy()
    });

    it('Deve gerar erro ao tentar registar um usuário com email em uso', async () => {
        try {
            await registerUseCase.execute({
                name: "Felipe Jonathan",
                email: "felipe@fmail.com",
                senha: "123456"
            })
        } catch (e: any) {
            expect(e.message).toBe('E-mail já cadastrado')
        }
    })

    it('Deve gerar erro ao passar parâmetros insuficientes para criação do usuário', async () => {
        try {
            await registerUseCase.execute({})
        } catch (e: any) {
            expect(e.message).toBe('Informações insuficientes para criação de um usuário')
        }
    })
})