import DataEncrypter from "../../core/auth/providers/DataEncrypter";

export default class InvertDataEncrypter implements DataEncrypter {
    encrypt(data: string): string {
        return data.split('').reverse().join('')
    }

    compare(data: string, encryptedData: string): boolean {
        return this.encrypt(data) === encryptedData;
    }
}