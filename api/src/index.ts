import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { setupSwagger } from "./swagger.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

setupSwagger(app);

app.use("/auth", authRoutes);

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
    console.log(`Swagger rodando em http://localhost:${port}/api`);
});
