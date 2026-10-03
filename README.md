# BookStore Manager CLI

Aplicação de terminal para gerenciamento de autores, livros, clientes e empréstimos, desenvolvida com Node.js, TypeScript e PostgreSQL.

## Requisitos

- Node.js 20 ou superior
- PostgreSQL instalado e em execução
- npm

## Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e informe host, porta, nome do banco, usuário e senha do PostgreSQL.

## Banco de dados

O arquivo `database/schema.sql` cria o banco `bookstore_db`, as tabelas e os relacionamentos. Execute com um usuário PostgreSQL que tenha permissão para criar bancos:

```bash
psql -U postgres -f database/schema.sql
```

Se o banco já existir, remova ou comente a instrução `CREATE DATABASE bookstore_db;` e execute o script conectado ao banco correto.

## Executar

Modo desenvolvimento:

```bash
npm run dev
```

Compilar TypeScript:

```bash
npm run build
```

Executar versão compilada:

```bash
npm start
```

## Arquitetura

- `controllers/`: recebe as ações da interface CLI e encaminha chamadas.
- `services/`: aplica validações e regras de negócio.
- `repositories/`: executa SQL parametrizado no PostgreSQL.
- `database/`: configura o pool de conexão.
- `models/`: interfaces e tipos do domínio.

Fluxo: CLI → Controller → Service → Repository → PostgreSQL.

## Funcionalidades

- CRUD de autores, livros e clientes.
- Empréstimos com prazo padrão de 14 dias.
- Devolução e atualização da disponibilidade.
- Consulta de empréstimos ativos e histórico.
- Relatórios SQL de livros por autor, empréstimos por cliente, livros por gênero, top 5 livros emprestados e livros disponíveis.

## Consultas SQL utilizadas

O projeto usa `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, `LEFT JOIN`, `GROUP BY`, `ORDER BY`, `LIMIT` e `COUNT`. Os valores de entrada são enviados por parâmetros SQL, evitando concatenar diretamente os valores fornecidos pelo usuário nas consultas.

## Modelo relacional

- `authors` 1:N `books`
- `books` 1:N `loans`
- `customers` 1:N `loans`

As chaves estrangeiras impedem excluir autores, livros ou clientes que ainda tenham registros dependentes.

## Exemplo de uso

1. Cadastre um autor.
2. Cadastre um livro usando o ID do autor.
3. Cadastre um cliente.
4. Crie um empréstimo informando os IDs do livro e do cliente.
5. Consulte empréstimos ativos e registre a devolução.
6. Abra Relatórios para executar consultas agregadas.

## Git e GitHub

Sugestão de fluxo de trabalho:

```bash
git init
git add .
git commit -m "chore: inicializa estrutura do projeto"
git checkout -b feat/crud-autores
# implemente e teste a funcionalidade
git add .
git commit -m "feat: implementa cadastro de autores"
git checkout -b feat/emprestimos
# implemente empréstimos e devoluções
git add .
git commit -m "feat: implementa empréstimos e devoluções"
```

Crie um repositório público no GitHub e envie o histórico com `git push -u origin <branch>`. Use branches por funcionalidade e mensagens de commit semânticas. Não inclua o arquivo `.env` no repositório.
