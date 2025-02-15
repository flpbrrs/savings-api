import DataEncrypter from "../../core/auth/providers/DataEncrypter";
import bcrypt from 'bcrypt'

export default class BcryptDataEncrypter implements DataEncrypter {
    private readonly GEN_SALT = bcrypt.genSaltSync(5)

    encrypt(data: string): string {
        return bcrypt.hashSync(data, this.GEN_SALT)
    }

    compare(data: string, encryptedData: string): boolean {
        return bcrypt.compareSync(data, encryptedData)
    }
}