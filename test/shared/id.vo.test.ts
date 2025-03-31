import { describe, expect, it } from '@jest/globals'
import Id from '../../src/core/shared/model/id.vo'

describe("Value Object: ID", () => {
    it("Deve criar um novo valor de id válido", () => {
        const id = Id.generate()
        expect(id).toHaveLength(36)
    })

    it("Deve lançar um erro ao tentar criar um id inválido", () => {
        expect(() => new Id("id")).toThrow('id.invalid')
    })

    it("Deve testar verdadeiro para ids iguais", () => {
        const id1 = new Id()
        const id2 = new Id(id1.value)

        expect(id1.equals(id2)).toBeTruthy()
        expect(id1.notEquals(id2)).toBeFalsy()
    })

    it("Deve testar falso para ids diferentes", () => {
        const id1 = new Id()
        const id2 = new Id()

        expect(id1.equals(id2)).toBeFalsy()
        expect(id1.notEquals(id2)).toBeTruthy()
    })

    it("Deve validar um id", () => {
        const isIdValid = Id.isValid(new Id())

        expect(isIdValid).toBeTruthy()
    })

    it("Deve invalidar um id", () => {
        const isId1Valid = Id.isValid(undefined as any)
        const isId2Valid = Id.isValid("id")

        expect(isId1Valid).toBeFalsy()
        expect(isId2Valid).toBeFalsy()
    })
})