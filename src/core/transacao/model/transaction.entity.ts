import CoreError from "../../shared/model/CoreError.error";
import Entity, { EntityProps } from "../../shared/model/entity.basis";
import Id from "../../shared/model/id.vo";
import NonNegative from "../../shared/model/non-negative.vo";
import SimpleName from "../../shared/model/simple-name.vo";
import Validator from "../../utils/Validator.util";
import TransactionType from "./transaction-type.vo";

export interface TransactionProps extends EntityProps {
    titulo?: string,
    descricao?: string,
    valor?: number,
    data?: string,
    tipo?: string,
    owner?: string
}

export default class Transaction extends Entity<Transaction, TransactionProps> {
    readonly titulo: SimpleName
    readonly descricao: SimpleName
    readonly valor: NonNegative
    readonly data: string
    readonly tipo: TransactionType
    readonly owner: Id

    constructor(props: TransactionProps) {
        super(props)

        this.titulo = new SimpleName(props.titulo)
        this.descricao = new SimpleName(props.descricao)
        this.valor = new NonNegative(props.valor)
        this.data = props.data ? props.data : ""
        this.tipo = new TransactionType(props.tipo)
        this.owner = new Id(props.owner!)

        this.validate()
    }

    private validate(): void | never {
        const validationErrors = Validator.combine(
            this.titulo.validate('title'),
            this.descricao.validate('description'),
            this.valor.validate('value'),
            this.tipo.validate(),
            this.props.owner
                ? null
                : new CoreError({ code: "owner.required" }),
            this.props.data
                ? null
                : new CoreError({ code: "date.required" })
        )

        if (validationErrors)
            throw validationErrors
    }
}