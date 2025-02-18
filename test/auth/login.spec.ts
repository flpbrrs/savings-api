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
            new JWTTokenGenerator(process.env.API_SECRET!)
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
        const response = await loginUseCase.execute({
            email: "felipe@fmail.com",
            senha: "123456"
        })

        const userDecoded = new JWTTokenGenerator(process.env.API_SECRET!).decode(response.token) as {
            iat: number,
            exp: number
        }

        expect(response.token).toBeDefined()
        expect(response.usuario.email).toBe('felipe@fmail.com')
    })

    it('Deve gerar erro ao tentar login com e-mail errado', async () => {
        expect(async () => {
            await loginUseCase.execute({
                email: 'usertest@umail.com',
                senha: '123456'
            })
        }).rejects.toThrowError('Credenciais inválidas')
    })
})