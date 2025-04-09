import Validator from "../../utils/Validator.util"

export default class NonNegative {
    constructor(readonly value?: number) {
        this.value = value ?? 0
    }

    validate(atribute: string = "number") {
        return Validator.valueGreaterThan(
            this.value!,
            0,
            `${atribute}.negative`,
            true
        )
    }
}