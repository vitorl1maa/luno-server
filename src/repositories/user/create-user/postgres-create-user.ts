
import { User } from "../../../models/user/user";
import { PrismaClient } from "../../../generated/prisma";
import { CreateUserParams, ICreateUserRepository } from "../../../controllers/user/create-user/protocols";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PostgresCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {

        const hashedPassword = await bcrypt.hash(params.password, 10);

        const user = await prisma.user.create({
            data: {
                ...params,
                password: hashedPassword
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword as User;
    }
}