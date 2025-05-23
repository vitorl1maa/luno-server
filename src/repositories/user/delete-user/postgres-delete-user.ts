import { IDeleteUserRepository } from "../../../controllers/user/delete-user/protocols";
import { Prisma, PrismaClient } from "../../../generated/prisma";
import { User } from "../../../models/user/user";

const prisma = new PrismaClient();

export class PostgresDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(id: number): Promise<User> {
        try {
            const deleteUser = await prisma.user.delete({
                where: { id }
            })
            return deleteUser as User;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Código P2025 → Registro não encontrado
                if (error.code === 'P2025') {
                    throw new Error(`User with id ${id} does not exist.`)
                }
            }
            throw new Error('Falied to delete user' + (error as Error).message)
        }
    }
}