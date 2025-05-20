import { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { PrismaClient } from "../../generated/prisma";
import { User } from "../../models/user/user";

const prisma = new PrismaClient();

export class PostgresCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        try {
            const user = await prisma.user.create({
                data: params,
            });

            return user

        } catch (error: any) {
            console.error("Erro ao criar usuário:", error);


            if (error.code === 'P2002') {
                throw new Error("E-mail já está em uso.");
            }

            throw new Error("Erro ao criar usuário no banco de dados.");
        }
    }
}