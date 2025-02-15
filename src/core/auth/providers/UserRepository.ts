import { User } from "../model/User";

export default interface UserRepository {
    insert(user: User): User
}