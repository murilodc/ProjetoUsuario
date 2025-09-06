import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import type { User } from "../types/user";

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setError("Usuário não autenticado");
            setLoading(false);
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
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return null;

    return(
        <div>
            <h1>Perfil do usuário</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}