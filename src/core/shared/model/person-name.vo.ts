import Validator from "../../utils/Validator.util"
import CoreError from "./CoreError.error"

export default class PersonName {
    private readonly MIN_SIZE: number = 4
    private readonly MAX_SIZE: number = 120
    private readonly MIN_SURNAME_QUANTITY: number = 2

    constructor(private readonly value: string) {
        this.value = value.trim()
    }

    get nome() {
        return this.value
    }

    get firstName() {
        return this.value.split(" ")[0]!
    }

    get lastNames(): string[] {
        return this.value.split(" ").slice(1)
    }

    validate(): CoreError | null {
        return Validator.combine(
            Validator.notEmpty(this.value, 'name.empty'),
            Validator.lengthGreaterThan(
                this.value,
                this.MIN_SIZE,
                'name.too-short',
                true
            ),
            Validator.lengthLessThan(
                this.value,
                this.MAX_SIZE,
                'name.too-long',
                true
            ),
            Validator.regex(
                this.value,
                /^[a-zA-ZÀ-ú'\.-\s]*$/,
                'name.invalid'
            ),
            Validator.lengthGreaterThan(
                this.value.split(" "),
                this.MIN_SURNAME_QUANTITY,
                'name.missing-surname',
                true
            )
        )
    }
}