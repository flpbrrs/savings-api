import { v4 as uuid } from 'uuid'

export class Id {
    static generate() {
        return uuid()
    }
}