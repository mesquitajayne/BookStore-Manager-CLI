ï»¿# BookStore Manager CLI

AplicaÃ§Ão de terminal para gerenciamento de autores, livros, clientes e emprÃ©stimos, desenvolvida com Node.js, TypeScript e PostgreSQL.

## Objetivo

O projeto tem como objetivo desenvolver um sistema de gerenciamento de uma biblioteca/livraria utilizando uma aplicaÃ§Ão CLI, banco de dados relacional PostgreSQL e uma arquitetura organizada em camadas.

## Tecnologias

* Node.js 20+
* TypeScript
* PostgreSQL
* `pg`
* `dotenv`
* `readline/promises`

## Requisitos

* Node.js 20 ou superior
* PostgreSQL instalado e em execuÃ§Ão
* npm

## InstalaÃ§Ão

Clone o repositÃ³rio e acesse a pasta do projeto:

```bash
git clone https://github.com/mesquitajayne/BookStore-Manager-CLI.git

cd BookStore-Manager-CLI
```

Instale as dependÃªncias:

```bash
npm install
```

Copie o arquivo `.env.example` para `.env` e configure os dados de acesso ao PostgreSQL.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_db
DB_USER=postgres
DB_PASSWORD=sua_senha
```

> O arquivo `.env` nÃo deve ser enviado ao GitHub.

## Banco de dados

O projeto utiliza PostgreSQL.

O arquivo `database/schema.sql` contÃ©m a criaÃ§Ão do banco, tabelas, chaves primÃ¡rias e chaves estrangeiras.

Execute:

```bash
psql -U postgres -f database/schema.sql
```

O modelo possui as seguintes tabelas:

* `authors`
* `books`
* `customers`
* `loans`

Relacionamentos:

* `authors` 1:N `books`
* `books` 1:N `loans`
* `customers` 1:N `loans`

## Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

### CompilaÃ§Ão

```bash
npm run build
```

### VersÃo compilada

```bash
npm start
```

## Arquitetura

O projeto utiliza uma arquitetura em camadas:

```text
CLI
 Ã¢â â
Controllers
 Ã¢â â
Services
 Ã¢â â
Repositories
 Ã¢â â
PostgreSQL
```

### Estrutura de pastas

```text
BookStore-Manager-CLI/

Ã¢âÅÃ¢ââ¬Ã¢ââ¬ database/
Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ schema.sql

Ã¢âÅÃ¢ââ¬Ã¢ââ¬ src/
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ controllers/
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ authorController.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ bookController.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ customerController.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ loanController.ts
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ reportController.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ database/
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ connection.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ models/
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ types.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ repositories/
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ authorRepository.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ bookRepository.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ customerRepository.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ loanRepository.ts
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ reportRepository.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ services/
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ authorService.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ bookService.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ customerService.ts
Ã¢ââ   Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ loanService.ts
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ reportService.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢âÅÃ¢ââ¬Ã¢ââ¬ utils/
Ã¢ââ   Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ validation.ts
Ã¢ââ   Ã¢ââ
Ã¢ââ   Ã¢ââÃ¢ââ¬Ã¢ââ¬ main.ts
Ã¢ââ
Ã¢âÅÃ¢ââ¬Ã¢ââ¬ .env.example
Ã¢âÅÃ¢ââ¬Ã¢ââ¬ .gitignore
Ã¢âÅÃ¢ââ¬Ã¢ââ¬ package.json
Ã¢âÅÃ¢ââ¬Ã¢ââ¬ tsconfig.json
Ã¢ââÃ¢ââ¬Ã¢ââ¬ README.md
```

### Camadas

* **Controllers:** recebem as aÃ§Ãµes da interface CLI e encaminham as chamadas.
* **Services:** aplicam validaÃ§Ãµes e regras de negÃ³cio.
* **Repositories:** executam as operaÃ§Ãµes SQL no PostgreSQL.
* **Models:** definem interfaces e tipos utilizados pela aplicaÃ§Ão.
* **Database:** configura a conexÃo com o PostgreSQL.
* **Utils:** reÃºne funÃ§Ãµes auxiliares de validaÃ§Ão utilizadas pela aplicaÃ§Ão.
* **Main:** controla os menus e a interaÃ§Ão com o usuÃ¡rio.

## Funcionalidades

### Autores

* Listagem de autores
* Cadastro
* Consulta por ID
* AtualizaÃ§Ão
* RemoÃ§Ão

### Livros

* Listagem de livros
* Cadastro vinculado a um autor existente
* Consulta por ID
* AtualizaÃ§Ão
* RemoÃ§Ão
* Controle de disponibilidade

### Clientes

* Listagem de clientes
* Cadastro
* Consulta por ID
* AtualizaÃ§Ão
* RemoÃ§Ão

### EmprÃ©stimos

* Listagem de emprÃ©stimos
* Cadastro de emprÃ©stimo
* ValidaÃ§Ão de livro e cliente
* ValidaÃ§Ão de disponibilidade
* Prazo padrÃo de 14 dias
* Registro de devoluÃ§Ão
* AtualizaÃ§Ão automÃ¡tica da disponibilidade
* Consulta de emprÃ©stimos ativos

### RelatÃ³rios

O sistema possui os relatÃ³rios exigidos pelo projeto:

1. Livros disponÃ­veis
2. Livros emprestados
3. Livros por autor
4. NÃºmero de emprÃ©stimos por livro
5. Clientes com emprÃ©stimos ativos

AlÃ©m deles, foram implementados relatÃ³rios adicionais:

* EmprÃ©stimos por cliente
* Livros por gÃªnero
* Top 5 livros mais emprestados

## Consultas SQL

O projeto utiliza operaÃ§Ãµes e recursos SQL como:

* `SELECT`
* `INSERT`
* `UPDATE`
* `DELETE`
* `INNER JOIN`
* `LEFT JOIN`
* `GROUP BY`
* `ORDER BY`
* `LIMIT`
* `COUNT`
* `WHERE`

As consultas utilizam parÃ¢metros do PostgreSQL (`$1`, `$2`, etc.), evitando a concatenaÃ§Ão direta de dados fornecidos pelo usuÃ¡rio.

## Tratamento de erros

A aplicaÃ§Ão utiliza `try/catch` para tratar operaÃ§Ãµes invÃ¡lidas sem encerrar o programa inesperadamente.

Exemplos:

* Autor inexistente
* Livro inexistente
* Cliente inexistente
* Livro sem exemplares disponÃ­veis
* ID invÃ¡lido
* Tentativa de devolver um emprÃ©stimo jÃ¡ devolvido

## Exemplo de uso

1. Cadastre um autor.
2. Cadastre um livro informando o ID do autor.
3. Cadastre um cliente.
4. Crie um emprÃ©stimo informando o ID do livro e do cliente.
5. Consulte os emprÃ©stimos ativos.
6. Registre a devoluÃ§Ão.
7. Consulte os relatÃ³rios.

## Git e GitHub

O projeto utiliza Git com branches separadas por funcionalidade:

```text
main
develop
feat/autores
feat/livros
feat/clientes
feat/emprestimos
docs/readme
```

As mensagens de commit seguem o padrÃo semÃ¢ntico, utilizando prefixos como:

* `feat:`
* `fix:`
* `docs:`
* `chore:`

O fluxo utilizado foi:

```text
feat/* Ã¢â â develop Ã¢â â main
```

## Kanban

O desenvolvimento do projeto foi acompanhado por meio de um quadro Kanban no GitHub Projects.

[Backlog ÃÂ· Gerente da Livraria CLI - Desenvolvimento](https://github.com/users/mesquitajayne/projects/2)

## Equipe

Projeto desenvolvido para a disciplina de Engenharia de Software.

## LicenÃ§a

Projeto acadÃªmico desenvolvido para fins educacionais.

## Checklist de entrega

- Projeto compilando com TypeScript
- PostgreSQL conectado e funcionando
- CRUDs de autores, livros e clientes
- EmprÃ©stimos e devoluÃ§Ãµes
- RelatÃ³rios
- DocumentaÃ§Ão e organizaÃ§Ão do projeto
- Kanban/GitHub atualizado para a entrega

