import { User } from "../../core/auth/model/User"
import UserRepository from "../../core/auth/providers/UserRepository"

export default class InMemoryUserRepository implements UserRepository {
    private static data: User[] = []

    insert(user: User): User {
        InMemoryUserRepository.data.push(user)
        return user
    }
}