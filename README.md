# 💰 Sistema Financeiro Distribuído

Este projeto consiste numa arquitetura de microsserviços para um sistema financeiro, focada em segurança centralizada (IAM), alta performance e escalabilidade. O ambiente é totalmente containerizado utilizando Docker.

## 🏗️ Arquitetura do Projeto

Estamos seguindo o **Cenário de Identidade Independente**, onde o Frontend possui inteligência para gerenciar o token e comunicar-se com múltiplos serviços.

* **Frontend (React + Vite):** Interface do utilizador. Gerencia a sessão via OIDC.
* **Identity Provider (Keycloak):** Responsável pela autenticação e emissão de tokens (JWT).
* **Persistência (PostgreSQL):** Banco de dados relacional robusto.
* **Backends (Em Breve):**
    * **Node.js (BFF):** Backend for Frontend para orquestração leve.
    * **Go (Core):** Microsserviço para processamento financeiro pesado.

---

## ✅ Tarefas Executadas (Log de Progresso)

### 1. Infraestrutura e Orquestração
- [x] Configuração do `docker-compose.yml` base.
- [x] Definição de **Redes Internas** (`app-network`) para comunicação entre contêineres.
- [x] Configuração de **Volumes Nomeados** (`pg_data`) para garantir que os dados do Keycloak e do banco não sejam perdidos ao reiniciar o Docker.
- [x] Solução de conflitos de dependências (`node_modules`) entre host e contêiner.

### 2. Segurança (IAM)
- [x] Configuração do container **Keycloak** conectado ao Postgres.
- [x] Definição do fluxo **Authorization Code com PKCE** (Padrão ouro para SPAs).
- [x] Configuração de clientes públicos e políticas de CORS (`Web Origins`).

### 3. Frontend (Vite)
- [x] Criação do projeto com React + TypeScript via Vite.
- [x] "Dockerização" do ambiente de desenvolvimento (com Hot Reload).
- [x] Implementação da biblioteca `keycloak-js`.
- [x] Criação do **AuthContext** e Hook `useAuth` para gestão global de estado de login.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Docker e Docker Compose instalados.
* Node.js (Opcional, apenas para intellisense local).

### Passo 1: Subir o Ambiente
No terminal, na raiz do projeto:

```bash
# Sobe os serviços e força a recriação das imagens se necessário
docker compose up --build

```

### Passo 2: Configuração Inicial do Keycloak (Apenas na 1ª vez)

Como o Keycloak vem "vazio", precisamos configurar o realm.

1. Acesse: `http://localhost:8080` (Admin: `admin` / Senha: `admin` ou a definida no docker-compose).
2. Crie um **Realm** chamado: `SistemaFinanceiro`.
3. Crie um **Client**:
* **Client ID:** `finance-frontend`
* **Valid Redirect URIs:** `http://localhost:5173/*`
* **Web Origins:** `+`


4. Crie um **Usuário** de teste (Menu Users -> Add user -> Definir senha na aba Credentials).

### Passo 3: Acessar a Aplicação

Acesse `http://localhost:5173`. Você será redirecionado para o login. Após logar, o token JWT será exibido no console/tela (conforme implementação atual).

---

## 🛠️ Comandos Úteis (Docker)

**Parar tudo (Mantendo dados):**

```bash
docker compose down

```

**Parar tudo e LIMPAR dados (Cuidado! Apaga o banco):**

```bash
docker compose down -v

```

**Instalar dependência nova no Frontend (sem parar o Docker):**

```bash
docker compose exec frontend npm install nome-da-lib

```

---

## 📂 Estrutura de Pastas Atual

```text
/financeiro
├── docker-compose.yml      # Orquestrador de serviços
├── README.md               # Documentação
├── frontend-vite/          # Aplicação React
│   ├── Dockerfile          # Configuração de img dev
│   ├── src/
│   │   ├── context/        # AuthContext.tsx (Lógica do Keycloak)
│   │   ├── main.tsx        # Provider de Autenticação
│   │   └── App.tsx         # Tela principal
└── (backend-node e backend-go serão criados a seguir)

```
### O que fazer com isso?
1.  Crie um arquivo chamado `README.md` na pasta raiz do seu projeto.
2.  Cole esse conteúdo.
3.  Sempre que avançarmos (criarmos o Node ou o Go), nós atualizaremos a seção "Tarefas Executadas".

Está pronto para avançar para o **Backend em Node.js** e fazer a primeira validação real desse token?

# Financas
