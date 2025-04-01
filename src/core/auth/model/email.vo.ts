import CoreError from "../../shared/model/CoreError.error"
import Validator from "../../utils/Validator.util"

export default class Email {
    private static readonly REGEX =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    constructor(private readonly value?: string) {
        this.value = value?.trim() ?? ""
    }

    get address() {
        return this.value!
    }

    get user() {
        return this.value?.split("@")[0]
    }

    get domain() {
        return this.value?.split("@")[1]
    }

    validate(): CoreError | null {
        return Validator.combine(
            Validator.notEmpty(this.value, 'email.empty'),
            Email.isValid(this.value!)
                ? null
                : new CoreError({ code: 'email.invalid', value: this.value })
        )
    }

    static isValid(email: string): boolean {
        return Email.REGEX.test(email)
    }
}