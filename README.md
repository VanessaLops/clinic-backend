# Projeto Clinic Backend

Este projeto é um backend para uma aplicação clínica, utilizando Node.js com Express e um banco de dados SQLite gerenciado pelo Prisma.

## Tecnologias Usadas

- Node.js
- Express
- Prisma
- SQLite
- bcryptjs para hash de senhas
- jsonwebtoken para autenticação
- nodemon para desenvolvimento

## Configuração do Banco de Dados

### Passo 1: Instalar as Dependências

Certifique-se de ter o Node.js instalado em sua máquina. Depois, no diretório do projeto, execute o seguinte comando para instalar as dependências:

- npm install

### Passo 2: Configurar o Prisma

- npx prisma init

## Migrar o Banco de Dados

- npx prisma migrate dev --name init

- npm run dev

## Cadastro de um usuário

## Endpoint

`POST /api/register`

## Requisição

### Corpo da Requisição

```json
{
    "email": "usuario@example.com",
    "password": "sua_senha"
}

## Endpoint

`POST /api/login`

## Requisição

### Corpo da Requisição

```json
{
    "email": "usuario@example.com",
    "password": "sua_senha"
}
