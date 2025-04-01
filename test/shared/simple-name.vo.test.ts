import { describe, it, expect } from "@jest/globals"
import SimpleName from "../../src/core/shared/model/simple-name.vo"

describe("Value Object: Simple Name", () => {
    it("Deve criar um nome simples válido", () => {
        const name = new SimpleName("Teste")

        expect(name.validate()).toBeNull()
    })

    it("Deve validar o nome simples de forma personalizada", () => {
        const simpleError = new SimpleName()

        expect(simpleError.validate('test')?.code).toBe("test.empty.too-short")
    })
})