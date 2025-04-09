import { describe, expect, it } from '@jest/globals'
import TransactionType from "../../src/core/transacao/model/transaction-type.vo"

describe("Object value: Transaction Type", () => {
    it("Deve criar tipos válidos", () => {
        const t1 = new TransactionType("expense")
        const t2 = new TransactionType("income")

        expect(t1.validate()).toBeNull()
        expect(t2.validate()).toBeNull()
    })

    it("Deve gerar erro ao tentar criar um tipo inválido", () => {
        const t1 = new TransactionType()
        const t2 = new TransactionType("entrada")

        expect(t1.validate()?.code).toBe('type.invalid')
        expect(t2.validate()?.code).toBe('type.invalid')
    })
})