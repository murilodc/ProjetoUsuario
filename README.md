# ProjetoUsuario – Autenticação Full-stack (Node.js + React)

## 1. Descrição

Aplicação simples de autenticação com:

- Cadastro (Sign Up)  
- Login (Sign In)  
- Logout  
- Página protegida exibindo dados do usuário logado  

**Tecnologias utilizadas:**

- Back-end: Node.js + TypeScript + MySQL  
- Front-end: React + TypeScript (Vite)  
- Autenticação: JWT  
- Documentação da API: Swagger  
- Containerização: Docker + Docker Compose

---

## 2. Pré-requisitos

- Docker  
- Docker Compose

---

## 3. Configuração do Ambiente

Copie o arquivo `.env.example` para `.env` em cada serviço (backend e frontend) e configure as variáveis conforme necessário.

```
Copy-Item .env.example .env
```

### Backend (`backend/.env`)

```
DATABASE_URL=mysql://user:pass@db:3306/mydb
JWT_SECRET=ChaveSecretaDoTokenJwtTestetecnico
PORT=4000
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://api:4000
```

---

## 4. Rodando a Aplicação com Docker Compose

No diretório raiz do projeto, execute:

```
docker compose up --build
```

Isso irá:

- Subir o MySQL  
- Subir a API Node.js na porta 4000  
- Subir o Front-end React na porta 3000

---

## 5. Acessando a Aplicação

- Front-end: http://localhost:3000  
- Swagger (documentação da API): http://localhost:4000/api

---

## 6. Funcionalidades

### Back-end

| Endpoint       | Método | Descrição                       | Protegido |
|----------------|--------|---------------------------------|-----------|
| /auth/signup   | POST   | Cadastra novo usuário           | ❌        |
| /auth/login    | POST   | Login e retorno de JWT          | ❌        |
| /auth/me       | GET    | Retorna dados do usuário logado | ✅        |

### Front-end

- Cadastro: `/signup`  
- Login: `/login`  
- Perfil: `/me` (protegido)  
- Logout: botão na página de perfil