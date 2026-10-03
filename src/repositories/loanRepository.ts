import { pool } from '../database/connection';

export class LoanRepository {
  async list(activeOnly = false) {
    const filter = activeOnly ? "WHERE l.status = 'active'" : '';
    return (await pool.query(
      `SELECT l.id, l.book_id, b.title AS book_title, l.customer_id, c.name AS customer_name,
       l.loan_date, l.due_date, l.returned_at, l.status
       FROM loans l JOIN books b ON b.id=l.book_id JOIN customers c ON c.id=l.customer_id
       ${filter} ORDER BY l.loan_date DESC, l.id DESC`
    )).rows;
  }

  async create(bookId: number, customerId: number) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const book = await client.query('SELECT id, available FROM books WHERE id=$1 FOR UPDATE', [bookId]);
      if (!book.rows[0]) throw new Error('Livro não encontrado.');
      if (book.rows[0].available <= 0) throw new Error('Não há exemplares disponíveis.');
      const customer = await client.query('SELECT id FROM customers WHERE id=$1', [customerId]);
      if (!customer.rows[0]) throw new Error('Cliente não encontrado.');
      const loan = await client.query(
        `INSERT INTO loans (book_id, customer_id, loan_date, due_date, status)
         VALUES ($1,$2,CURRENT_DATE,CURRENT_DATE + 14,'active') RETURNING *`,
        [bookId, customerId]
      );
      await client.query('UPDATE books SET available=available-1 WHERE id=$1', [bookId]);
      await client.query('COMMIT');
      return loan.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async returnLoan(id: number) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query('SELECT * FROM loans WHERE id=$1 FOR UPDATE', [id]);
      const loan = result.rows[0];
      if (!loan) throw new Error('Empréstimo não encontrado.');
      if (loan.status === 'returned') throw new Error('Este empréstimo já foi devolvido.');
      await client.query("UPDATE loans SET status='returned', returned_at=CURRENT_DATE WHERE id=$1", [id]);
      await client.query('UPDATE books SET available=available+1 WHERE id=$1', [loan.book_id]);
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
