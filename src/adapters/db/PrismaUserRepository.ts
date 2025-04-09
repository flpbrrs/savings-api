import { PrismaClient } from "@prisma/client";
import UserRepository from "../../core/auth/providers/UserRepository";
import User from "../../core/auth/model/user.entity";

export default class PrismaUserRepository implements UserRepository {
    private readonly prisma = new PrismaClient()

    async insert(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                nome: user.nome.nome!,
                email: user.email.address!,
                senha: user.senha?.value!
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        let props = await this.prisma.user.findFirst({
            where: { email }
        })

        return props ? new User(props) : null
    }
}