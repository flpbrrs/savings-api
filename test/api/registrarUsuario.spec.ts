import { describe, expect, it } from '@jest/globals'
import { User } from '@prisma/client'
import axios from 'axios'

const BASE_URL = process.env.API_URL

describe.skip('Fluxo API: Registrar usuário', () => {
    it('Deve registrar o usuário caso não esteja cadastrado', async () => {
        const userTest: Partial<User> = {
            nome: "Usuário teste",
            email: "teste@tmail.com",
            senha: "root123456"
        }

        const response = await axios.post(`${BASE_URL}/register`, userTest)

        expect(response.status).toBe(201)
    })
})