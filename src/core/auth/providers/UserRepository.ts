import { UserProps } from "../model/user.entity"

export default interface UserRepository {
    insert(user: UserProps): Promise<void>
    findByEmail(email: string): Promise<UserProps | null>
}