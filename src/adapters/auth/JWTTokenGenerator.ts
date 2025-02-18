import jwt from 'jsonwebtoken'
import { TokenGenerator } from "../../core/auth/providers/TokenGenerator";

export default class JWTTokenGenerator implements TokenGenerator {

    constructor(private readonly secret: string) {
        if (!this.secret)
            throw new Error('Defina o secret')
    }

    sign(data: string | object): string {
        return jwt.sign(data, this.secret, { expiresIn: '1d' })
    }

    decode(token: string): string | object {
        return jwt.verify(token, this.secret)
    }
}