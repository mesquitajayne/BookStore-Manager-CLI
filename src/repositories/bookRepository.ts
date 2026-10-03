import { pool } from '../database/connection';
import { NewBook } from '../models/types';

export class BookRepository {
  async list() {
    return (await pool.query(
      `SELECT b.id, b.title, b.author_id, a.name AS author_name, b.genre, b.publication_year, b.quantity, b.available
       FROM books b JOIN authors a ON a.id = b.author_id ORDER BY b.title`
    )).rows;
  }
  async get(id: number) {
    return (await pool.query('SELECT * FROM books WHERE id = $1', [id])).rows[0] ?? null;
  }
  async create(data: NewBook) {
    const quantity = data.quantity ?? 1;
    return (await pool.query(
      `INSERT INTO books (title, author_id, genre, publication_year, quantity, available)
       VALUES ($1, $2, $3, $4, $5, $5) RETURNING *`,
      [data.title, data.author_id, data.genre ?? null, data.publication_year ?? null, quantity]
    )).rows[0];
  }
  async update(id: number, data: Partial<NewBook>) {
    const current = await this.get(id);
    if (!current) return null;
    const quantity = data.quantity ?? current.quantity;
    const borrowed = current.quantity - current.available;
    const available = Math.max(0, quantity - borrowed);
    if (available > quantity) throw new Error('A quantidade disponível não pode exceder a quantidade total.');
    return (await pool.query(
      `UPDATE books SET title=$2, author_id=$3, genre=$4, publication_year=$5, quantity=$6, available=$7
       WHERE id=$1 RETURNING *`,
      [id, data.title ?? current.title, data.author_id ?? current.author_id, data.genre ?? current.genre,
       data.publication_year ?? current.publication_year, quantity, available]
    )).rows[0];
  }
  async delete(id: number) {
  const result = await pool.query(
    'DELETE FROM books WHERE id=$1 RETURNING id',
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}
}
