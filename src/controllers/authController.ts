import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export const signup = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const senhaCriptografada = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                email,
                password: senhaCriptografada,
            },
        });

        return res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
}

export const me = async (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
}
