import User from "../model/user.entity"

export default interface UserRepository {
    insert(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
}