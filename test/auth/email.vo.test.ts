import { describe, expect, it } from '@jest/globals'
import Email from "../../src/core/auth/model/email.vo"
import CoreError from '../../src/core/shared/model/CoreError.error'

describe("Value Object: Email", () => {
    it("Deve gerar um email válido", () => {
        const email = new Email("felipe@fmail.com")

        expect(email.address).toBe("felipe@fmail.com")
        expect(email.domain).toBe("fmail.com")
        expect(email.user).toBe("felipe")
        expect(email.validate()).toBeNull()
    })

    it("Deve gerar um erro ao tentar criar um email inválido", () => {
        const emailError = new Email()

        expect(emailError.validate()).toBeInstanceOf(CoreError)
        expect(emailError.validate()?.code).toBe("email.empty.invalid")
    })
})