import { prisma } from "../../../database/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ILoginRepository, LoginParams } from "../../../controllers/auth/login/protocols";

export class PostgresLoginRepository implements ILoginRepository {
    async login(params: LoginParams) {
        const { email, password } = params;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Senha incorreta')
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        const { password: _, ...userWithoutPassword } = user;

        return {
            data: {
                user: userWithoutPassword,
                token
            }
        }
    }
}