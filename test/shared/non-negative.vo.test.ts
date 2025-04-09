import { describe, expect, it } from '@jest/globals'
import NonNegative from "../../src/core/shared/model/non-negative.vo"

describe("Value Object: Non Negative", () => {
    it("Deve criar um número não negativo", () => {
        const number = new NonNegative(10)

        expect(number.value).toBe(10)
        expect(number.validate()).toBeNull()
    })

    it("Deve gerar um erro ao tentar criar um número negativo", () => {
        const numberError = new NonNegative(-10).validate()

        expect(numberError?.code).toBe('number.negative')
    })
})