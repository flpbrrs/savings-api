import { beforeAll, describe, expect, it } from '@jest/globals'
import Login from '../../src/core/auth/services/login'
import BcryptDataEncrypter from '../../src/adapters/auth/BcryptDataEncrypter'
import JWTTokenGenerator from '../../src/adapters/auth/JWTTokenGenerator'
import InMemoryUserRepository from '../../src/adapters/db/InMemoryUserRepository'
import RegistrarUsuario from '../../src/core/auth/services/registrarUsuario'

describe('Casos de uso: Login', () => {
    let loginUseCase: Login

    beforeAll(async () => {
        loginUseCase = new Login(
            new InMemoryUserRepository(),
            new BcryptDataEncrypter(),
            new JWTTokenGenerator()
        )

        await new RegistrarUsuario(
            new InMemoryUserRepository(),
            new BcryptDataEncrypter()
        ).execute(
            {
                nome: "Felipe Barros",
                email: "felipe@fmail.com",
                senha: "123456"
            }
        )
    })

    it('Deve gerar um token com o login do usuário', async () => {
        const token = await loginUseCase.execute(
            "felipe@fmail.com",
            "123456"
        )

        const userDecoded = new JWTTokenGenerator().decode(token) as {
            id: string,
            email: string,
            iat: number,
            exp: number
        }

        expect(token).toBeDefined()
        expect(userDecoded.email).toBe('felipe@fmail.com')
    })

    it('Deve gerar erro ao tentar login com e-mail errado', async () => {
        expect(async () => {
            await loginUseCase.execute(
                'usertest@umail.com',
                '123456'
            )
        }).rejects.toThrowError('Credenciais inválidas')
    })
})