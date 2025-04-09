import { describe, it, expect } from "@jest/globals"
import User from '../../src/core/auth/model/user.entity'

describe("Entity: User", () => {
    it("Deve criar um usuário válido", () => {
        const user = new User({
            nome: "Felipe Jonathan",
            email: "felipe@fmail.com",
            senha: "$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6"
        })

        expect(user.id).toBeDefined()
        expect(user.nome.firstName).toBe("Felipe")
        expect(user.email.user).toBe("felipe")
    })

    it("Deve criar um usuário sem senha", () => {
        const user = new User({
            nome: "Felipe Jonathan",
            email: "felipe@fmail.com"
        })

        expect(user.id).toBeDefined()
        expect(user.nome.firstName).toBe("Felipe")
        expect(user.email.user).toBe("felipe")
    })

    it("Deve gerar erro ao criar um user inválido", () => {
        try {
            new User({})
        } catch (e: any) {
            expect(e.props.code)
                .toBe("name.empty.too-short.missing-surname,email.empty.invalid")
        }
    })
})