import { User } from "../model/User";

export default interface UserRepository {
    insert(user: Partial<User>): Promise<User>
    findByEmail(email: string): Promise<User | null>
}