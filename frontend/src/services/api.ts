import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const signup = async (email: string, password: string): Promise<{ id: number; email: string}> => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.message || 'Erro ao cadastrar');
    }

    return res.json();
};

export const login = async (email: string, password: string): Promise<{ token: string }> => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.message || 'Erro ao logar');
    }

    return res.json();
};

export const getProfile = async (token: string): Promise<User> => {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${token}` },
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.message || 'Erro ao buscar perfil');
    }

    return res.json();
};