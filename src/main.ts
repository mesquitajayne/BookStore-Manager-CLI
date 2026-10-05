import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { pool, testConnection } from './database/connection';
import { AuthorController } from './controllers/authorController';
import { BookController } from './controllers/bookController';
import { CustomerController } from './controllers/customerController';
import { LoanController } from './controllers/loanController';
import { ReportController } from './controllers/reportController';
import { parsePositiveInt } from './utils/validation';

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
  return parsePositiveInt(await ask(label));
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
      console.log(`${label} nÃ£o encontrado.`);
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
      const title = await ask('TÃ­tulo: ');
      const author_id = await number('ID do autor: ');
      const genre = await ask('GÃªnero: ');
      const year = await ask('Ano de publicaÃ§Ã£o (Enter para ignorar): ');
      const qtyText = await ask('Quantidade (padrÃ£o 1): ');

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
      const name = await ask('Novo nome (Enter mantÃ©m): ');
      const nationality = await ask('Nova nacionalidade (Enter mantÃ©m): ');
      const year = await ask('Novo ano de nascimento (Enter mantÃ©m): ');

      console.log(
        'Atualizado:',
        await authors.update(id, {
          name: name || undefined,
          nationality: nationality || undefined,
          birth_year: year ? Number(year) : undefined
        })
      );
    } else if (entity === 'books') {
      const title = await ask('Novo tÃ­tulo (Enter mantÃ©m): ');
      const authorText = await ask('Novo ID do autor (Enter mantÃ©m): ');
      const genre = await ask('Novo gÃªnero (Enter mantÃ©m): ');
      const qtyText = await ask('Nova quantidade total (Enter mantÃ©m): ');

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
      const name = await ask('Novo nome (Enter mantÃ©m): ');
      const email = await ask('Novo e-mail (Enter mantÃ©m): ');
      const phone = await ask('Novo telefone (Enter mantÃ©m): ');

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
    console.log('OpÃ§Ã£o invÃ¡lida.');
  }
}

async function loanMenu(): Promise<void> {
  console.log(
    '\n1. Listar emprÃ©stimos' +
    '\n2. Novo emprÃ©stimo' +
    '\n3. Registrar devoluÃ§Ã£o' +
    '\n4. EmprÃ©stimos ativos' +
    '\n0. Voltar'
  );

  const op = await ask('Escolha: ');

  if (op === '1') {
    show('EmprÃ©stimos', await loans.list());
  } else if (op === '2') {
    const bookId = await number('ID do livro: ');
    const customerId = await number('ID do cliente: ');

    console.log(
      'EmprÃ©stimo registrado:',
      await loans.create(bookId, customerId)
    );
  } else if (op === '3') {
    await loans.returnLoan(await number('ID do emprÃ©stimo: '));
    console.log('DevoluÃ§Ã£o registrada.');
  } else if (op === '4') {
    show('EmprÃ©stimos ativos', await loans.active());
  } else if (op !== '0') {
    console.log('OpÃ§Ã£o invÃ¡lida.');
  }
}

async function reportMenu(): Promise<void> {
  console.log(
    '\n1. Livros por autor (LEFT JOIN + GROUP BY)' +
    '\n2. EmprÃ©stimos por cliente (LEFT JOIN + GROUP BY + ORDER BY)' +
    '\n3. Livros por gÃªnero (GROUP BY + ORDER BY)' +
    '\n4. Top 5 livros emprestados (JOIN + GROUP BY + LIMIT)' +
    '\n5. Livros disponÃ­veis (JOIN + WHERE)' +
    '\n6. Livros emprestados' +
    '\n7. NÃºmero de emprÃ©stimos por livro' +
    '\n8. Clientes com emprÃ©stimos ativos' +
    '\n0. Voltar'
  );

  const op = await ask('Escolha: ');

  if (op === '1') {
    show('Livros por autor', await reports.booksByAuthor());
  } else if (op === '2') {
    show('EmprÃ©stimos por cliente', await reports.loansByCustomer());
  } else if (op === '3') {
    show('Livros por gÃªnero', await reports.booksByGenre());
  } else if (op === '4') {
    show('Top 5 livros', await reports.topBooks());
  } else if (op === '5') {
    show('Livros disponÃ­veis', await reports.availableBooks());
  } else if (op === '6') {
    show('Livros emprestados', await reports.borrowedBooks());
  } else if (op === '7') {
    show('NÃºmero de emprÃ©stimos por livro', await reports.loansByBook());
  } else if (op === '8') {
    show('Clientes com emprÃ©stimos ativos', await reports.customersWithActiveLoans());
  } else if (op !== '0') {
    console.log('OpÃ§Ã£o invÃ¡lida.');
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
        '4. EmprÃ©stimos\n' +
        '5. RelatÃ³rios\n' +
        '0. Sair'
      );

      const op = await ask('Escolha uma opÃ§Ã£o: ');

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
          console.log('OpÃ§Ã£o invÃ¡lida.');
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
      'NÃ£o foi possÃ­vel iniciar. Verifique a conexÃ£o e o arquivo .env.'
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

