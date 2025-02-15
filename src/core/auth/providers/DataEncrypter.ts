export default interface DataEncrypter {
    encrypt(data: string): string
    compare(data: string, encryptedData: string): boolean
}