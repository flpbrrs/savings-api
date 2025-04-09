import CoreError from "../../shared/model/CoreError.error";
import Validator from "../../utils/Validator.util";

export default class TransactionType {
    constructor(readonly type?: string) {
        this.type = type ?? ""
    }

    validate(atribute: string = 'type'): CoreError | null {
        if (this.type === "expense" || this.type === "income")
            return null

        return new CoreError({ code: `${atribute}.invalid` })
    }
}