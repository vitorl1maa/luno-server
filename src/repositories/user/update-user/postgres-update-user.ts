import { IUpdateUserRepository, UpdateUserParams } from "../../../controllers/user/update-user/protocols";
import { PrismaClient } from "../../../generated/prisma";
import { User } from "../../../models/user/user";


const prisma = new PrismaClient();

export class PostgresUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: number, params: UpdateUserParams): Promise<User> {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            throw new Error('User not updated');
        }

        const updateUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { ...params, }
        })
        return updateUser as User;
    }
}