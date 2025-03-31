import CoreError from "../shared/model/CoreError.error";

export default class Validator {
    static combine(...errors: (CoreError | null)[]): CoreError[] | null {
        const coerErrors = errors.filter(
            (error) => error !== null
        ) as CoreError[]

        return coerErrors.length > 0
            ? coerErrors
            : null
    }

    static notNull(value: any, error: string): CoreError | null {
        return value !== null && value !== undefined
            ? null
            : CoreError.create(error, value)
    }

    static notEmpty(
        value: string | null | undefined,
        error: string
    ): CoreError | null {
        if (Validator.notNull(value, error))
            return CoreError.create(error, value)

        return value!.trim() !== ''
            ? null
            : CoreError.create(error, value)
    }

    static lengthLessThan(
        value: string | any[],
        maxLength: number,
        error: string,
        includeLimit: boolean = false
    ): CoreError | null {
        let condition = includeLimit
            ? value.length <= maxLength
            : value.length < maxLength

        return condition
            ? null
            : CoreError.create(error, value, { max: maxLength })
    }

    static valueLessThan(
        value: number,
        maxValue: number,
        error: string,
        includeLimit: boolean = false
    ): CoreError | null {
        let condition = includeLimit
            ? value <= maxValue
            : value < maxValue

        return condition
            ? null
            : CoreError.create(error, value, { max: maxValue })
    }

    static lengthGreaterThan(
        value: string | any[],
        minLength: number,
        error: string,
        includeLimit: boolean = false
    ): CoreError | null {
        let condition = includeLimit
            ? value.length >= minLength
            : value.length > minLength

        return condition
            ? null
            : CoreError.create(error, value, { min: minLength })
    }

    static valueGreaterThan(
        value: number,
        minValue: number,
        error: string,
        includeLimit: boolean = false
    ): CoreError | null {
        let condition = includeLimit
            ? value >= minValue
            : value > minValue

        return condition
            ? null
            : CoreError.create(error, value, { min: minValue })
    }

    static regex(
        value: string,
        regex: RegExp,
        error: string
    ): CoreError | null {
        return regex.test(value)
            ? null
            : CoreError.create(error, value)
    }
}