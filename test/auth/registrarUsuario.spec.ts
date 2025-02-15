import { beforeAll, describe, expect, it } from "@jest/globals"
import RegistrarUsuario from '../../src/core/auth/services/registrarUsuario'
import InMemoryUserRepository from "../../src/adapters/db/InMemoryUserRepository"
import InvertDataEncrypter from '../../src/adapters/auth/InvertDataEncrypter'

describe('Casos de uso: Autenticação', () => {
    let registerUseCase: RegistrarUsuario

    beforeAll(() => {
        registerUseCase = new RegistrarUsuario(
            new InMemoryUserRepository(),
            new InvertDataEncrypter()
        )
    });

    it('Deve registrar um usuários', () => {
        const user = registerUseCase.execute({
            name: "Felipe Jonathan",
            email: "felipe@fmail.com",
            senha: "123456"
        })

        expect(user).toHaveProperty('id')
        expect(user.name).toBe("Felipe Jonathan")
        expect(user.email).toBe("felipe@fmail.com")
        expect(user.senha).toBe("654321")
    });

    it('Deve gerar erro ao passar parâmetros insuficientes para criação do usuário', () => {
        expect(() => {
            registerUseCase.execute({})
        }).toThrow('Informações insuficientes para criação de um usuário')
    })
})