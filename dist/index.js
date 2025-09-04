import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
