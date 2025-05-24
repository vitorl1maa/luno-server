import { prisma } from "../../../database/prisma";

export class PostgresGetUserByIdRepository {
    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const { password, ...userWithoutPassword } = user

        return userWithoutPassword;
    }
}
