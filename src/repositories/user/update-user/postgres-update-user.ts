import { IUpdateUserRepository, UpdateUserParams } from "../../../controllers/user/update-user/protocols";
import { PrismaClient } from "../../../generated/prisma";
import { User } from "../../../models/user/user";


const prisma = new PrismaClient();

export class PostgresUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: number, params: UpdateUserParams): Promise<User> {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { ...params, }
        })

        const { password: _, ...userWithoutPassword } = updatedUser;

        return userWithoutPassword as User;
    }
}