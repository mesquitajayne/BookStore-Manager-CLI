import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { pool, testConnection } from './database/connection';
import { AuthorController } from './controllers/authorController';
import { BookController } from './controllers/bookController';
import { CustomerController } from './controllers/customerController';
import { LoanController } from './controllers/loanController';
import { ReportController } from './controllers/reportController';

const rl = createInterface({ input, output });
const authors = new AuthorController();
const books = new BookController();
const customers = new CustomerController();
const loans = new LoanController();
const reports = new ReportController();

async function ask(label: string): Promise<string> {
  return (await rl.question(label)).trim();
}

async function number(label: string): Promise<number> {
  const value = Number(await ask(label));
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('Digite um número inteiro positivo.');
  }
  return value;
}

function show(title: string, rows: unknown[]) {
  console.log(`\n--- ${title} ---`);

  if (!rows.length) {
    console.log('Nenhum registro encontrado.');
    return;
  }

  console.table(rows);
}

async function crudMenu(entity: 'authors' | 'books' | 'customers'): Promise<void> {
  const label = entity === 'authors' ? 'Autor' : entity === 'books' ? 'Livro' : 'Cliente';
  const plural = entity === 'authors' ? 'Autores' : entity === 'books' ? 'Livros' : 'Clientes';

console.log(
  `\n1. Listar ${plural}` +
  `\n2. Consultar por ID` +
  `\n3. Cadastrar` +
  `\n4. Atualizar` +
  `\n5. Remover` +
  `\n0. Voltar`
);
  const op = await ask('Escolha: ');

  if (op === '0') return;

  if (op === '1') {
    show(
      `${plural}`,
      entity === 'authors'
        ? await authors.list()
        : entity === 'books'
          ? await books.list()
          : await customers.list()
    );
    return;
  }

  if (op === '2') {
    const id = await number(`ID do ${label.toLowerCase()}: `);

    const result =
      entity === 'authors'
        ? await authors.get(id)
        : entity === 'books'
          ? await books.get(id)
          : await customers.get(id);

    if (!result) {
      console.log(`${label} não encontrado.`);
      return;
    }

    show(`${label} encontrado`, [result]);
    return;
  }

  if (op === '3') {
    if (entity === 'authors') {
      const name = await ask('Nome: ');
      const nationality = await ask('Nacionalidade: ');
      const year = await ask('Ano de nascimento (Enter para ignorar): ');

      console.log(
        'Cadastrado:',
        await authors.create({
          name,
          nationality: nationality || undefined,
          birth_year: year ? Number(year) : undefined
        })
      );
    } else if (entity === 'books') {
      const title = await ask('Título: ');
      const author_id = await number('ID do autor: ');
      const genre = await ask('Gênero: ');
      const year = await ask('Ano de publicação (Enter para ignorar): ');
      const qtyText = await ask('Quantidade (padrão 1): ');

      console.log(
        'Cadastrado:',
        await books.create({
          title,
          author_id,
          genre: genre || undefined,
          publication_year: year ? Number(year) : undefined,
          quantity: qtyText ? Number(qtyText) : 1
        })
      );
    } else {
      const name = await ask('Nome: ');
      const email = await ask('E-mail: ');
      const phone = await ask('Telefone: ');

      console.log(
        'Cadastrado:',
        await customers.create({
          name,
          email: email || undefined,
          phone: phone || undefined
        })
      );
    }

    return;
  }

  const id = await number(`ID do ${label.toLowerCase()}: `);

  if (op === '4') {
    if (entity === 'authors') {
      const name = await ask('Novo nome (Enter mantém): ');
      const nationality = await ask('Nova nacionalidade (Enter mantém): ');
      const year = await ask('Novo ano de nascimento (Enter mantém): ');

      console.log(
        'Atualizado:',
        await authors.update(id, {
          name: name || undefined,
          nationality: nationality || undefined,
          birth_year: year ? Number(year) : undefined
        })
      );
    } else if (entity === 'books') {
      const title = await ask('Novo título (Enter mantém): ');
      const authorText = await ask('Novo ID do autor (Enter mantém): ');
      const genre = await ask('Novo gênero (Enter mantém): ');
      const qtyText = await ask('Nova quantidade total (Enter mantém): ');

      console.log(
        'Atualizado:',
        await books.update(id, {
          title: title || undefined,
          author_id: authorText ? Number(authorText) : undefined,
          genre: genre || undefined,
          quantity: qtyText ? Number(qtyText) : undefined
        })
      );
    } else {
      const name = await ask('Novo nome (Enter mantém): ');
      const email = await ask('Novo e-mail (Enter mantém): ');
      const phone = await ask('Novo telefone (Enter mantém): ');

      console.log(
        'Atualizado:',
        await customers.update(id, {
          name: name || undefined,
          email: email || undefined,
          phone: phone || undefined
        })
      );
    }
  } else if (op === '5') {
    if (entity === 'authors') {
      await authors.delete(id);
    } else if (entity === 'books') {
      await books.delete(id);
    } else {
      await customers.delete(id);
    }

    console.log('Registro removido.');
  } else {
    console.log('Opção inválida.');
  }
}

async function loanMenu(): Promise<void> {
  console.log(
    '\n1. Listar empréstimos' +
    '\n2. Novo empréstimo' +
    '\n3. Registrar devolução' +
    '\n4. Empréstimos ativos' +
    '\n0. Voltar'
  );

  const op = await ask('Escolha: ');

  if (op === '1') {
    show('Empréstimos', await loans.list());
  } else if (op === '2') {
    const bookId = await number('ID do livro: ');
    const customerId = await number('ID do cliente: ');

    console.log(
      'Empréstimo registrado:',
      await loans.create(bookId, customerId)
    );
  } else if (op === '3') {
    await loans.returnLoan(await number('ID do empréstimo: '));
    console.log('Devolução registrada.');
  } else if (op === '4') {
    show('Empréstimos ativos', await loans.active());
  } else if (op !== '0') {
    console.log('Opção inválida.');
  }
}

async function reportMenu(): Promise<void> {
  console.log(
    '\n1. Livros por autor (LEFT JOIN + GROUP BY)' +
    '\n2. Empréstimos por cliente (LEFT JOIN + GROUP BY + ORDER BY)' +
    '\n3. Livros por gênero (GROUP BY + ORDER BY)' +
    '\n4. Top 5 livros emprestados (JOIN + GROUP BY + LIMIT)' +
    '\n5. Livros disponíveis (JOIN + WHERE)' +
    '\n6. Livros emprestados' +
    '\n7. Número de empréstimos por livro' +
    '\n8. Clientes com empréstimos ativos' +
    '\n0. Voltar'
  );

  const op = await ask('Escolha: ');

  if (op === '1') {
    show('Livros por autor', await reports.booksByAuthor());
  } else if (op === '2') {
    show('Empréstimos por cliente', await reports.loansByCustomer());
  } else if (op === '3') {
    show('Livros por gênero', await reports.booksByGenre());
  } else if (op === '4') {
    show('Top 5 livros', await reports.topBooks());
  } else if (op === '5') {
    show('Livros disponíveis', await reports.availableBooks());
  } else if (op === '6') {
    show('Livros emprestados', await reports.borrowedBooks());
  } else if (op === '7') {
    show('Número de empréstimos por livro', await reports.loansByBook());
  } else if (op === '8') {
    show('Clientes com empréstimos ativos', await reports.customersWithActiveLoans());
  } else if (op !== '0') {
    console.log('Opção inválida.');
  }
}

async function main(): Promise<void> {
  try {
    await testConnection();

    let running = true;

    while (running) {
      console.log(
        '\n====================================' +
        '\n   BookStore Manager CLI v1.0.0' +
        '\n===================================='
      );

      console.log(
        '1. Autores\n' +
        '2. Livros\n' +
        '3. Clientes\n' +
        '4. Empréstimos\n' +
        '5. Relatórios\n' +
        '0. Sair'
      );

      const op = await ask('Escolha uma opção: ');

      try {
        if (op === '1') {
          await crudMenu('authors');
        } else if (op === '2') {
          await crudMenu('books');
        } else if (op === '3') {
          await crudMenu('customers');
        } else if (op === '4') {
          await loanMenu();
        } else if (op === '5') {
          await reportMenu();
        } else if (op === '0') {
          running = false;
        } else {
          console.log('Opção inválida.');
        }
      } catch (error) {
        console.error(
          'Erro:',
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  } catch (error) {
    console.error(
      'Não foi possível iniciar. Verifique a conexão e o arquivo .env.'
    );

    console.error(
      error instanceof Error ? error.message : String(error)
    );

    process.exitCode = 1;
  } finally {
    rl.close();
    await pool.end();
  }
}

main();