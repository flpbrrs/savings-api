import { describe, it, expect } from "@jest/globals"
import HashPassword from "../../src/core/auth/model/hash-password.vo"
import CoreError from "../../src/core/shared/model/CoreError.error"

describe("Value Object: Hash Password", () => {
    it("Deve criar uma senha hash válida", () => {
        const senha =
            new HashPassword("$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6")

        expect(senha.validate()).toBeNull()
    })

    it("Deve invalidar um hash inválido", () => {
        const senha = new HashPassword()

        expect(senha.validate()).toBeInstanceOf(CoreError)
        expect(senha.validate()?.code).toBe("hash.invalid")
    })
})