import { User } from "../../core/auth/model/User"
import UserRepository from "../../core/auth/providers/UserRepository"

export default class InMemoryUserRepository implements UserRepository {
    private static data: User[] = []

    async insert(user: Partial<User>): Promise<User> {
        const newUser: User = {
            id: String(Math.random()),
            name: user.name!,
            email: user.email!,
            senha: user.senha!
        }

        InMemoryUserRepository.data.push(newUser)
        return newUser
    }
}