import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Nenhum token informado" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token malformado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload;
        next();
    } catch (err){
        return res.status(401).json({ message: "Token inválido" });
    }
};