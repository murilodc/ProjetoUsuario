import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types/express.js';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Nenhum token informado" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token malformado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = payload;
        next();
    } catch (err){
        return res.status(401).json({ message: "Token inválido" });
    }
};