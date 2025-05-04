import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { PostgresClient } from "../../database/postgres";
import { PrismaClient } from "../../generated/prisma";
import { User } from "../../models/user";

const prisma = new PrismaClient();

export class PostgresGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users

    }

}