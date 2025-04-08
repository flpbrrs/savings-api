import { PrismaClient } from "@prisma/client";
import UserRepository from "../../core/auth/providers/UserRepository";
import User, { UserProps } from "../../core/auth/model/user.entity";

export default class PrismaUserRepository implements UserRepository {
    private readonly prisma = new PrismaClient()

    async insert(user: UserProps): Promise<void> {
        await this.prisma.user.create({
            data: {
                nome: user.name!,
                email: user.email!,
                senha: user.password!
            }
        })
    }

    async findByEmail(email: string): Promise<UserProps | null> {
        return this.prisma.user.findFirst({
            where: { email }
        })
    }
}