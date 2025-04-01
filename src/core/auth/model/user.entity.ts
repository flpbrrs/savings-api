import Entity, { EntityProps } from "../../shared/model/entity.basis";
import PersonName from "../../shared/model/person-name.vo";
import Validator from "../../utils/Validator.util";
import Email from "./email.vo";
import HashPassword from "./hash-password.vo";

export interface UserProps extends EntityProps {
    name?: string,
    email?: string,
    password?: string
}

export default class User extends Entity<User, UserProps> {
    readonly name: PersonName
    readonly email: Email
    readonly password?: HashPassword | null

    constructor(props: UserProps) {
        super(props)

        this.name = new PersonName(props.name)
        this.email = new Email(props.email)
        this.password = this.props.password
            ? new HashPassword(props.password)
            : null

        this.validate()
    }

    private validate(): void | never {
        const validationErrors = Validator.combine(
            this.name.validate(),
            this.email.validate(),
            this.password ? this.password.validate() : null
        )

        if (validationErrors)
            throw validationErrors
    }
}