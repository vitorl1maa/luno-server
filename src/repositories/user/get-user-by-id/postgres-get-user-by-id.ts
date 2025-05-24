import { prisma } from "../../../database/prisma";

export class PostgresGetUserByIdRepository {
    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return user;
    }
}
