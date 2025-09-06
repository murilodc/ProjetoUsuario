import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signup(email, password);
            navigate("/login");
        } catch (err: unknown){
            if(err instanceof Error){
                setError(err.message || "Erro ao cadastrar");
            } else {
                setError("Erro desconhecido!");
            }
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}