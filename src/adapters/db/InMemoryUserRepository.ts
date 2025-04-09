import User from "../../core/auth/model/user.entity"
import UserRepository from "../../core/auth/providers/UserRepository"

export default class InMemoryUserRepository implements UserRepository {
    static data: User[] = []

    async insert(user: Partial<User>): Promise<void> {
        const newUser = new User({
            nome: user.nome?.nome!,
            email: user.email?.address!,
            senha: user.senha?.value!
        })

        InMemoryUserRepository.data.push(newUser)
    }

    async findByEmail(email: string): Promise<User | null> {
        return InMemoryUserRepository.data.find((user: User) => (
            user.email.address === email
        )) ?? null
    }
}