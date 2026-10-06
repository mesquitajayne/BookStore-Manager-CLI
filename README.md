# BookStore Manager CLI

Aplicacao de terminal para gerenciamento de autores, livros, clientes e emprestimos, desenvolvida em TypeScript com PostgreSQL.

## Objetivo

Desenvolver uma aplicacao CLI para gerenciamento de uma livraria, utilizando:

* Node.js
* TypeScript
* PostgreSQL
* Arquitetura em camadas
* Git e GitHub

## Tecnologias

* Node.js
* TypeScript
* PostgreSQL
* pg
* dotenv
* readline/promises

## Requisitos

Antes de executar o projeto, tenha instalado:

* Node.js
* npm
* PostgreSQL
* Git

## Instalacao

Clone o repositorio:

```bash
git clone https://github.com/mesquitajayne/BookStore-Manager-CLI.git
```

Entre na pasta:

```bash
cd BookStore-Manager-CLI
```

Instale as dependencias:

```bash
npm install
```

## Configuracao do banco de dados

Crie um banco de dados PostgreSQL.

Depois, execute o arquivo:

```text
database/schema.sql
```

Configure o arquivo `.env` com os dados do PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore
```

O arquivo `.env` nao deve ser enviado para o GitHub.

## Execucao

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Para gerar a versao compilada:

```bash
npm run build
```

## Arquitetura

O projeto utiliza uma arquitetura em camadas para separar as responsabilidades da aplicacao.

```text
src/
|
+-- controllers/
|
+-- database/
|
+-- models/
|
+-- repositories/
|
+-- services/
|
+-- utils/
|
+-- main.ts
```

### Controllers

Responsaveis pela interacao com o usuario e pelo fluxo das operacoes.

### Services

Contem as regras de negocio da aplicacao.

### Repositories

Responsaveis pela comunicacao com o banco de dados.

### Models

Contem os tipos e estruturas utilizadas no sistema.

### Database

Responsavel pela conexao com o PostgreSQL.

### Utils

Contem funcoes auxiliares e validacoes.

## Funcionalidades

O sistema permite realizar as seguintes operacoes:

### Autores

* Cadastrar autor
* Listar autores
* Buscar autor
* Atualizar autor
* Remover autor

### Livros

* Cadastrar livro
* Listar livros
* Buscar livro
* Atualizar livro
* Remover livro
* Consultar disponibilidade

### Clientes

* Cadastrar cliente
* Listar clientes
* Buscar cliente
* Atualizar cliente
* Remover cliente

### Emprestimos

* Realizar emprestimo
* Listar empres
