import { describe, expect, it } from '@jest/globals'
import Entity, { EntityProps } from '../../src/core/shared/model/entity.basis'
import Id from '../../src/core/shared/model/id.vo'

interface TestProps extends EntityProps {
    name?: string
    age?: number
}

class Test extends Entity<Test, TestProps> {
    constructor(props: TestProps) {
        super(props)
    }
}

describe("Basis object: entity", () => {
    it("Deve comparar duas entidades como iguais", () => {
        const baseId = Id.generate()

        const e1 = new Test({ id: baseId, name: "e1", age: 1 })
        const e2 = new Test({ id: baseId, name: "e2", age: 2 })

        expect(e1.equal(e2)).toBeTruthy()
        expect(e1.notEquals(e2)).toBeFalsy()
    })

    it("Deve clonar uma entidade", () => {
        const e1 = new Test({ name: "e1", age: 1 })
        const e2 = e1.clone({ name: "eClone" })

        expect(e1.equal(e2)).toBeTruthy()
        expect(e2.props.name).toBe("eClone")
    })
})