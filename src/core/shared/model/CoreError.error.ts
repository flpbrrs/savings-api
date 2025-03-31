export interface CoreErrorProps {
    code?: string,
    value?: any,
    extras?: object
}

export default class CoreError extends Error {
    readonly code?: string
    readonly value?: any
    readonly extras?: any

    constructor(readonly props?: CoreErrorProps) {
        super(props?.code ?? 'core.generic')

        this.code = props?.code ?? 'core.generic'
        this.value = props?.value
        this.extras = props?.extras ?? {}
    }

    static create(code?: string, value?: any, extras?: any): CoreError {
        return new CoreError({ code, value, extras })
    }

    static throwCoreError(code?: string, value?: any, extras?: any): never {
        throw new CoreError({ code, value, extras })
    }
}