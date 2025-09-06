import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isValidEmail } from '../utils/validators.js';
import handleError from '../utils/util.js';
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha não informados" });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email inválido" });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existente" });
        }
        const senhaCriptografada = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
            data: {
                email,
                password: senhaCriptografada,
            },
        });
        return res.status(201).json({ id: user.id, email: user.email });
    }
    catch (error) {
        handleError(res, error);
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (error) {
        handleError(res, error);
    }
};
export const me = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        const userId = Number(req.user.id);
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json({ id: user.id, email: user.email, createdAt: user.createdAt });
    }
    catch (error) {
        handleError(res, error);
    }
};
