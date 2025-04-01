import Validator from "../../utils/Validator.util";
import CoreError from "./CoreError.error";

export default class SimpleName {
    constructor(readonly value?: string) {
        this.value = value?.trim() ?? ""
    }

    validate(
        atribute: string = "name",
        min: number = 3,
        max: number = 120
    ): CoreError | null {
        return Validator.combine(
            Validator.notEmpty(this.value!, `${atribute}.empty`),
            Validator.lengthGreaterThan(
                this.value!,
                min,
                `${atribute}.too-short`,
                true
            ),
            Validator.lengthLessThan(
                this.value!,
                max,
                `${atribute}.too-long`,
                true
            ),
            Validator.regex(
                this.value!,
                /^[a-zA-ZÀ-ú'\.-\s]*$/,
                `${atribute}.invalid`
            )
        )
    }
}