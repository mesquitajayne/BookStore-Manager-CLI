import { pool } from '../database/connection';

export class ReportRepository {
  async booksByAuthor() {
    return (await pool.query(
      `SELECT a.id, a.name AS author, COUNT(b.id)::int AS total_books
       FROM authors a LEFT JOIN books b ON b.author_id=a.id
       GROUP BY a.id, a.name ORDER BY total_books DESC, a.name`
    )).rows;
  }
  async loansByCustomer() {
    return (await pool.query(
      `SELECT c.name AS customer, COUNT(l.id)::int AS total_loans
       FROM customers c LEFT JOIN loans l ON l.customer_id=c.id
       GROUP BY c.id, c.name ORDER BY total_loans DESC, c.name`
    )).rows;
  }
  async booksByGenre() {
    return (await pool.query(
      `SELECT COALESCE(genre, '(sem gênero)') AS genre, COUNT(*)::int AS total_books
       FROM books GROUP BY genre ORDER BY total_books DESC`
    )).rows;
  }
  async topBooks() {
    return (await pool.query(
      `SELECT b.title, COUNT(l.id)::int AS total_loans
       FROM books b LEFT JOIN loans l ON l.book_id=b.id
       GROUP BY b.id, b.title ORDER BY total_loans DESC, b.title LIMIT 5`
    )).rows;
  }
  async availableBooks() {
    return (await pool.query(
      `SELECT b.id, b.title, a.name AS author, b.available
       FROM books b JOIN authors a ON a.id=b.author_id
       WHERE b.available > 0 ORDER BY b.title`
    )).rows;
  }
    async borrowedBooks() {
    return (await pool.query(
      `SELECT b.id, b.title, a.name AS author, b.available
       FROM books b
       JOIN authors a ON a.id = b.author_id
       WHERE b.available < b.quantity
       ORDER BY b.title`
    )).rows;
  }

  async loansByBook() {
    return (await pool.query(
      `SELECT b.id, b.title, COUNT(l.id)::int AS total_loans
       FROM books b
       LEFT JOIN loans l ON l.book_id = b.id
       GROUP BY b.id, b.title
       ORDER BY total_loans DESC, b.title`
    )).rows;
  }

  async customersWithActiveLoans() {
    return (await pool.query(
      `SELECT c.id, c.name, c.email, COUNT(l.id)::int AS active_loans
       FROM customers c
       JOIN loans l ON l.customer_id = c.id
       WHERE l.status = 'active'
       GROUP BY c.id, c.name, c.email
       ORDER BY active_loans DESC, c.name`
    )).rows;
  }
}
