import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado");
      setLoading(false);
      navigate("/login");
      return;
    }

    getProfile(token)
      .then(setUser)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message || "Erro ao buscar perfil");
        } else {
          setError("Erro desconhecido!");
        }
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Perfil do usuário</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Data de cadastro:</strong>{" "}
            {new Date(user.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                })}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
