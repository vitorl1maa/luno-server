
import { User } from "../../../models/user/user";
import { PrismaClient } from "../../../generated/prisma";
import { CreateUserParams, ICreateUserRepository } from "../../../controllers/user/create-user/protocols";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PostgresCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {

        const hashedPassword = await bcrypt.hash(params.password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                    ...params,
                    password: hashedPassword
                },
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