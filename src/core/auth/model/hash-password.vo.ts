import CoreError from "../../shared/model/CoreError.error"

export default class HashPassword {
    private static readonly REGEX =
        /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/

    constructor(readonly value?: string) {
        this.value = value?.trim() ?? ""
    }

    validate(): CoreError | null {
        if (HashPassword.isValid(this.value!))
            return null
        return new CoreError({
            code: "hash.invalid"
        })
    }

    static isValid(hash: string): boolean {
        return HashPassword.REGEX.test(hash)
    }
}