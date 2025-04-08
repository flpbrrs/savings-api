import Entity, { EntityProps } from "../../shared/model/entity.basis";
import PersonName from "../../shared/model/person-name.vo";
import Validator from "../../utils/Validator.util";
import Email from "./email.vo";
import HashPassword from "./hash-password.vo";

export interface UserProps extends EntityProps {
    nome?: string,
    email?: string,
    senha?: string
}

export default class User extends Entity<User, UserProps> {
    readonly nome: PersonName
    readonly email: Email
    readonly senha?: HashPassword | null

    constructor(props: UserProps) {
        super(props)

        this.nome = new PersonName(props.nome)
        this.email = new Email(props.email)
        this.senha = this.props.senha
            ? new HashPassword(props.senha)
            : null

        this.validate()
    }

    get withoutPassword(): UserProps {
        return { ...this.props, senha: undefined }
    }

    private validate(): void | never {
        const validationErrors = Validator.combine(
            this.nome.validate(),
            this.email.validate(),
            this.senha ? this.senha.validate() : null
        )

        if (validationErrors)
            throw validationErrors
    }
}