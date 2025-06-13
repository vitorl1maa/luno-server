import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { unauthorized, badRequest } from "../controllers/helpers/helpers";

export interface JwtPayload {
    userId: number;
    iat: number;
    exp: number;
}

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return unauthorized(res);
    }

    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
        return badRequest('Formato de token inválido');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (!decoded.userId) {
            return unauthorized(res);
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return unauthorized(res);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return unauthorized(res);
        }
        return unauthorized(res);
    }
}