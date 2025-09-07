import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      navigate("/me");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao logar");
      } else {
        setError("Erro desconhecido!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500 dark:text-gray-400">
            Não tem conta?{" "}
            <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
            >
                Cadastre-se
            </span>
        </CardFooter>
      </Card>
    </div>
  );
};
