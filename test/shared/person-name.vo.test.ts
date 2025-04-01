import { describe, expect, it } from '@jest/globals'
import PersonName from '../../src/core/shared/model/person-name.vo'
import CoreError from '../../src/core/shared/model/CoreError.error'

describe("Value Object: Person name", () => {
    it("Deve gerar um nome válido", () => {
        const name = new PersonName("Felipe Jonathan")

        expect(name.nome).toBe("Felipe Jonathan")
        expect(name.firstName).toBe("Felipe")
        expect(name.lastNames).toHaveLength(1)
        expect(name.validate()).toBeNull()
    })

    it("Deve gerar erro ao tentar criar nome inválido", () => {
        const nameError = new PersonName()

        expect(nameError.validate()).toBeInstanceOf(CoreError)
        expect(nameError.validate()?.code)
            .toBe("name.empty.too-short.missing-surname")
    })
})