import Id from "./id.vo"

export interface EntityProps {
    id?: string
}

export default abstract class Entity<Type, Props extends EntityProps> {
    readonly id: Id
    readonly props: Props

    constructor(props: Props) {
        this.id = new Id(props.id)
        this.props = { ...props, id: this.id.value }
    }

    equal(entity: Entity<Type, Props>): boolean {
        return this.id.equals(entity.id)
    }

    notEquals(entity: Entity<Type, Props>): boolean {
        return this.id.notEquals(entity.id)
    }

    clone(props: Props, ...args: any[]): Type {
        return new (this.constructor as any)(
            {
                ...this.props,
                ...props
            },
            ...args
        )
    }
}