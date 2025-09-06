import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setError("Usuário não autenticado");
            setLoading(false);
            navigate("/login");
            return;
        }

        getProfile(token)
            .then(setUser)
            .catch((err: unknown) => {
                if(err instanceof Error){
                    setError(err.message || "Erro ao buscar perfil");
                } else {
                    setError("Erro desconhecido!");
                }
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return null;

    return(
        <div>
            <h1>Perfil do usuário</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}