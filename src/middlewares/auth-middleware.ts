import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { unauthorized } from "../controllers/helpers/helpers";


export interface AuthenticatedRequest extends Request {
    userId?: number;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return unauthorized(res)
    }


    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return unauthorized(res);
    }
}