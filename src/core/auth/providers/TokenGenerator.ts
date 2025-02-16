export interface TokenGenerator {
    sign(data: any, options?: any): string
    decode(token: string): any
}