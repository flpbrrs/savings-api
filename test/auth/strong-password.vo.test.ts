import { describe, it, expect } from "@jest/globals"
import StrongPassword from "../../src/core/auth/model/strong-password.vo"
import CoreError from "../../src/core/shared/model/CoreError.error"

describe("Value Object: Strong Password", () => {
    it("Deve criar uma senha forte válida", () => {
        const senha = new StrongPassword("!SenhaForte123456")

        expect(senha.value).toBe("!SenhaForte123456")
        expect(senha.validate()).toBeNull()
    })

    it("Deve gerar error ao criar uma senha fraca", () => {
        const errorSenha = new StrongPassword()

        expect(errorSenha.validate()).toBeInstanceOf(CoreError)
        expect(errorSenha.validate()?.code).toBe("password.empty.weak")
    })
})