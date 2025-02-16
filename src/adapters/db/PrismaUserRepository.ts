import { PrismaClient } from "@prisma/client";
import { User } from "../../core/auth/model/User";
import UserRepository from "../../core/auth/providers/UserRepository";

export default class PrismaUserRepository implements UserRepository {
    private readonly prisma = new PrismaClient()

    async insert(user: Partial<User>): Promise<User> {
        return await this.prisma.user.create({
            data: {
                nome: user.nome!,
                email: user.email!,
                senha: user.senha!
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { email }
        })
    }
}