import { describe, it, expect } from "@jest/globals"
import Transaction from "../../src/core/transacao/model/transaction.entity"
import Id from "../../src/core/shared/model/id.vo"

describe("Entity: Transction", () => {
    it("Deve criar uma transação válida", () => {
        const transaction = new Transaction({
            titulo: "Segunda quinzena - Março",
            descricao: "Salário",
            valor: 810,
            data: "2025-03-30",
            tipo: "income",
            owner: Id.generate()
        })
    })

    it("Deve gerar erro ao criar transações inválidas", () => {
        try {
            new Transaction({})
        } catch (e: any) {
            expect(e.props.code)
                .toBe("title.empty.too-short,description.empty.too-short,value.negative,type.invalid,owner.required,date.required")
        }
    })
})