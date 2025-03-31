import { describe, expect, it } from '@jest/globals'
import Validator from '../../src/core/utils/Validator.util'
import CoreError from '../../src/core/shared/model/CoreError.error'

describe("Util: Validator", () => {
    it("Deve validar um valor não nulo", () => {
        const error = Validator.notNull('User Name', 'user.empty-name')

        expect(error).toBeNull()
    })

    it("Deve invalidar valores nulos", () => {
        const e1 = Validator.notNull(null, 'user.empty-name')
        const e2 = Validator.notNull(undefined, 'user.empty-name')

        expect(e1?.code).toBe('user.empty-name')
        expect(e2?.code).toBe('user.empty-name')
    })

    it("Deve validar string não vazias", () => {
        const error = Validator.notEmpty("Felipe", "person-name.empty")

        expect(error).toBeNull()
    })

    it("Deve invalidar uma string vazia", () => {
        const e1 = Validator.notEmpty("", "person-name.empty")
        const e2 = Validator.notEmpty(null, "person-name.empty")

        expect(e1).toBeInstanceOf(CoreError)
        expect(e1?.code).toBe("person-name.empty")
    })

    it("Deve válidar uma string/array com tamanho máximo", () => {
        const e1 = Validator.lengthLessThan("Olá", 5, "message.too-long")
        const e2 = Validator
            .lengthLessThan("Bom dia", 7, "message.too-long", true)
        const e3 = Validator
            .lengthLessThan([1, 2, 3], 5, 'items.too-much')

        expect(e1).toBeNull()
        expect(e2).toBeNull()
        expect(e3).toBeNull()
    })

    it("Deve invalidar uma string/array com tamanho máximo", () => {
        const e1 = Validator.lengthLessThan("Bom dia", 5, "message.too-long")
        const e2 = Validator
            .lengthLessThan("Bom dia!", 7, "message.too-long", true)
        const e3 = Validator
            .lengthLessThan([1, 2, 3], 2, 'items.too-much')

        expect(e1).toBeInstanceOf(CoreError)
        expect(e2).toBeInstanceOf(CoreError)
        expect(e3).toBeInstanceOf(CoreError)
    })

    it("Deve validar um número com valor máximo", () => {
        const e1 = Validator.valueLessThan(10, 100, 'size.too-long')
        const e2 = Validator.valueLessThan(100, 100, 'size.too-long', true)

        expect(e1).toBeNull()
        expect(e2).toBeNull()
    })

    it("Deve invalidar um número com valor máximo", () => {
        const e1 = Validator.valueLessThan(110, 100, 'size.too-long')
        const e2 = Validator.valueLessThan(101, 100, 'size.too-long', true)

        expect(e1).toBeInstanceOf(CoreError)
        expect(e2).toBeInstanceOf(CoreError)
    })

    it("Deve válidar uma string/array com tamanho mínimo", () => {
        const e1 = Validator.lengthGreaterThan("Olá", 2, "message.too-short")
        const e2 = Validator
            .lengthGreaterThan("Bom dia", 7, "message.too-short", true)
        const e3 = Validator
            .lengthGreaterThan([1, 2, 3], 2, 'items.insuficient')

        expect(e1).toBeNull()
        expect(e2).toBeNull()
        expect(e3).toBeNull()
    })

    it("Deve validar um número com valor mínimo", () => {
        const e1 = Validator.valueGreaterThan(10, 5, 'size.too-long')
        const e2 = Validator.valueGreaterThan(100, 100, 'size.too-long', true)

        expect(e1).toBeNull()
        expect(e2).toBeNull()
    })

    it("Deve invalidar um número com valor mínimo", () => {
        const e1 = Validator.valueGreaterThan(4, 5, 'size.too-long')
        const e2 = Validator.valueGreaterThan(99, 100, 'size.too-long', true)

        expect(e1).toBeInstanceOf(CoreError)
        expect(e2).toBeInstanceOf(CoreError)
    })

    it("Deve validar um regex", () => {
        const error = Validator.regex(
            "felipe@fmail.com",
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            'email.invalid'
        )

        expect(error).toBeNull()
    })

    it("Deve invalidar um regex", () => {
        const error = Validator.regex(
            "felipe@fmail",
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            'email.invalid'
        )

        expect(error).toBeInstanceOf(CoreError)
    })

    it("Deve combinar errors", () => {
        const errors = Validator.combine(
            Validator.notEmpty("", "person-name.empty"),
            Validator.lengthGreaterThan("", 4, "person-name.too-short"),
        )

        expect(errors?.code).toBe('person-name.empty.too-short')
    })

    it("Deve retornar nulo em casos sem errors", () => {
        const errors = Validator.combine(
            Validator.notEmpty("Felipe", "person-name.empty"),
            Validator.lengthGreaterThan("Felipe", 4, "person-name.too-short"),
        )

        expect(errors).toBeNull()
    })
})