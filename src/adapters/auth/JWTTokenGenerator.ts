import jwt from 'jsonwebtoken'
import { TokenGenerator } from "../../core/auth/providers/TokenGenerator";

export default class JWTTokenGenerator implements TokenGenerator {
    private readonly SECRET = process.env.API_SECRET!

    constructor() {
        if (!this.SECRET)
            throw new Error('Defina o secret')
    }

    sign(data: any, options?: any): string {
        return jwt.sign(data, this.SECRET, options)
    }

    decode(token: string) {
        return jwt.verify(token, this.SECRET!)
    }
}