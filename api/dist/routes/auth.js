import express from "express";
import { signup, login, me } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */
/**
 * @swagger
 * /signup:
 *   post:
 *    summary: Criar um novo usuário
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: usuario@email.com
 *              password:
 *               type: string
 *               example: senha123
 *   responses:
 *      201:
 *       description: Usuário criado com sucesso
 *      400:
 *          description: Requisição inválida ou usuário já existente
 */
router.post("/signup", signup);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Fazer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retorna informações do usuário logado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Não autorizado
 */
router.get("/me", authMiddleware, me);
export default router;
