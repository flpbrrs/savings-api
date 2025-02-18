export interface TokenGenerator {
    sign(data: string | object): string
    decode(token: string): string | object
}