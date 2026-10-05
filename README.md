# BookStore Manager CLI

Aplicação de terminal para gerenciamento de autores, livros, clientes e empréstimos, desenvolvida com Node.js, TypeScript e PostgreSQL.

## Objetivo

O projeto tem como objetivo desenvolver um sistema de gerenciamento de uma biblioteca/livraria utilizando uma aplicação CLI, banco de dados relacional PostgreSQL e uma arquitetura organizada em camadas.

## Tecnologias

* Node.js 20+
* TypeScript
* PostgreSQL
* `pg`
* `dotenv`
* `readline/promises`

## Requisitos

* Node.js 20 ou superior
* PostgreSQL instalado e em execução
* npm

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/mesquitajayne/BookStore-Manager-CLI.git

cd BookStore-Manager-CLI
```

Instale as dependências:

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

> O arquivo `.env` não deve ser enviado ao GitHub.

## Banco de dados

O projeto utiliza PostgreSQL.

O arquivo `database/schema.sql` contém a criação do banco, tabelas, chaves primárias e chaves estrangeiras.

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

### Compilação

```bash
npm run build
```

### Versão compilada

```bash
npm start
```

## Arquitetura

O projeto utiliza uma arquitetura em camadas:

```text
CLI
 ↓
Controllers
 ↓
Services
 ↓
Repositories
 ↓
PostgreSQL
```

### Estrutura de pastas

```text
BookStore-Manager-CLI/

├── database/
│   └── schema.sql

├── src/
│   ├── controllers/
│   │   ├── authorController.ts
│   │   ├── bookController.ts
│   │   ├── customerController.ts
│   │   ├── loanController.ts
│   │   └── reportController.ts
│   │
│   ├── database/
│   │   └── connection.ts
│   │
│   ├── models/
│   │   └── types.ts
│   │
│   ├── repositories/
│   │   ├── authorRepository.ts
│   │   ├── bookRepository.ts
│   │   ├── customerRepository.ts
│   │   ├── loanRepository.ts
│   │   └── reportRepository.ts
│   │
│   ├── services/
│   │   ├── authorService.ts
│   │   ├── bookService.ts
│   │   ├── customerService.ts
│   │   ├── loanService.ts
│   │   └── reportService.ts
│   │
│   ├── utils/
│   │   └── validation.ts
│   │
│   └── main.ts
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Camadas

* **Controllers:** recebem as ações da interface CLI e encaminham as chamadas.
* **Services:** aplicam validações e regras de negócio.
* **Repositories:** executam as operações SQL no PostgreSQL.
* **Models:** definem interfaces e tipos utilizados pela aplicação.
* **Database:** configura a conexão com o PostgreSQL.
* **Utils:** reúne funções auxiliares de validação utilizadas pela aplicação.
* **Main:** controla os menus e a interação com o usuário.

## Funcionalidades

### Autores

* Listagem de autores
* Cadastro
* Consulta por ID
* Atualização
* Remoção

### Livros

* Listagem de livros
* Cadastro vinculado a um autor existente
* Consulta por ID
* Atualização
* Remoção
* Controle de disponibilidade

### Clientes

* Listagem de clientes
* Cadastro
* Consulta por ID
* Atualização
* Remoção

### Empréstimos

* Listagem de empréstimos
* Cadastro de empréstimo
* Validação de livro e cliente
* Validação de disponibilidade
* Prazo padrão de 14 dias
* Registro de devolução
* Atualização automática da disponibilidade
* Consulta de empréstimos ativos

### Relatórios

O sistema possui os relatórios exigidos pelo projeto:

1. Livros disponíveis
2. Livros emprestados
3. Livros por autor
4. Número de empréstimos por livro
5. Clientes com empréstimos ativos

Além deles, foram implementados relatórios adicionais:

* Empréstimos por cliente
* Livros por gênero
* Top 5 livros mais emprestados

## Consultas SQL

O projeto utiliza operações e recursos SQL como:

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

As consultas utilizam parâmetros do PostgreSQL (`$1`, `$2`, etc.), evitando a concatenação direta de dados fornecidos pelo usuário.

## Tratamento de erros

A aplicação utiliza `try/catch` para tratar operações inválidas sem encerrar o programa inesperadamente.

Exemplos:

* Autor inexistente
* Livro inexistente
* Cliente inexistente
* Livro sem exemplares disponíveis
* ID inválido
* Tentativa de devolver um empréstimo já devolvido

## Exemplo de uso

1. Cadastre um autor.
2. Cadastre um livro informando o ID do autor.
3. Cadastre um cliente.
4. Crie um empréstimo informando o ID do livro e do cliente.
5. Consulte os empréstimos ativos.
6. Registre a devolução.
7. Consulte os relatórios.

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

As mensagens de commit seguem o padrão semântico, utilizando prefixos como:

* `feat:`
* `fix:`
* `docs:`
* `chore:`

O fluxo utilizado foi:

```text
feat/* → develop → main
```

## Kanban

O desenvolvimento do projeto foi acompanhado por meio de um quadro Kanban no GitHub Projects.

[Backlog · Gerente da Livraria CLI - Desenvolvimento](https://github.com/users/mesquitajayne/projects/2)

## Equipe

Projeto desenvolvido para a disciplina de Engenharia de Software.

## Licença

Projeto acadêmico desenvolvido para fins educacionais.

## Checklist de entrega

- Projeto compilando com TypeScript
- PostgreSQL conectado e funcionando
- CRUDs de autores, livros e clientes
- Empr�stimos e devolu��es
- Relat�rios
- Documenta��o e organiza��o do projeto
- Kanban/GitHub atualizado para a entrega
