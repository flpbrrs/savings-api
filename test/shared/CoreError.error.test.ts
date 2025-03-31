import { describe, expect, it } from '@jest/globals'
import CoreError from '../../src/core/shared/model/CoreError.error'

describe("Shared: Core Error", () => {
    it("Deve criar um erro generico", () => {
        const error = new CoreError()

        expect(error.code).toBe('core.generic')
        expect(error.message).toBe('core.generic')
        expect(error.value).toBeUndefined()
        expect(error.extras).toStrictEqual({})
    })

    it("Deve criar um erro personalizado", () => {
        const validationError = new CoreError({
            code: 'transaction.invalid-amount',
            value: -100,
            extras: {
                min: 1
            }
        })

        expect(validationError.code).toBe('transaction.invalid-amount')
        expect(validationError.message).toBe('transaction.invalid-amount')
        expect(validationError.value).toBe(-100)
        expect(validationError.extras.min).toBe(1)
    })

    it("Deve criar um Erro através do método estático", () => {
        const error = CoreError.create()

        expect(error.code).toBe('core.generic')
        expect(error.message).toBe('core.generic')
        expect(error.value).toBeUndefined()
        expect(error.extras).toStrictEqual({})
    })

    it("Deve lançar um erro no momento da criação", () => {
        expect(() => CoreError.throwCoreError()).toThrow('core.generic')
    })
})