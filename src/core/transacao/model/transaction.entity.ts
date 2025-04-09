import Entity, { EntityProps } from "../../shared/model/entity.basis";
import Id from "../../shared/model/id.vo";
import NonNegative from "../../shared/model/non-negative.vo";
import SimpleName from "../../shared/model/simple-name.vo";
import TransactionType from "./transaction-type.vo";

export interface TransactionProps extends EntityProps {
    titulo?: string,
    descricao?: string,
    valor?: number,
    data?: Date,
    tipo?: string,
    owner?: string
}

export default class Transaction extends Entity<Transaction, TransactionProps> {
    readonly titulo: SimpleName
    readonly descricao: SimpleName
    readonly valor: NonNegative
    readonly data: Date
    readonly tipo: TransactionType
    readonly owner: Id

    constructor(props: TransactionProps) {
        super(props)

        this.titulo = new SimpleName(props.titulo)
        this.descricao = new SimpleName(props.descricao)
        this.valor = new NonNegative(props.valor)
        this.data = props.data ? new Date(props.data!) : new Date()
        this.tipo = new TransactionType(props.tipo)
        this.owner = new Id(props.id!)
    }

    private validate(): void | never {

    }
}