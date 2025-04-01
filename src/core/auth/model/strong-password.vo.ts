import CoreError from "../../shared/model/CoreError.error"
import Validator from "../../utils/Validator.util"

export default class StrongPassword {
    private static readonly REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    constructor(readonly value?: string) {
        this.value = value?.trim() ?? ""
    }

    validate(): CoreError | null {
        return Validator.combine(
            Validator.notEmpty(this.value, 'password.empty'),
            StrongPassword.isValid(this.value!)
                ? null
                : new CoreError({
                    code: 'password.weak',
                    value: this.value
                })
        )
    }

    static isValid(password: string): boolean {
        return this.REGEX.test(password)
    }
}