import { describe, it, expect } from "@jest/globals"
import User from '../../src/core/auth/model/user.entity'

describe("Entity: User", () => {
    it("Deve criar um usuário válido", () => {
        const user = new User({
            name: "Felipe Jonathan",
            email: "felipe@fmail.com",
            password: "!SenhaForte123"
        })

        expect(user.id).toBeDefined()
        expect(user.name.firstName).toBe("Felipe")
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