import { pool } from '../database/connection';
import { NewAuthor } from '../models/types';

export class AuthorRepository {
  async list() {
    return (await pool.query('SELECT id, name, nationality, birth_year FROM authors ORDER BY name')).rows;
  }
  async get(id: number) {
    return (await pool.query('SELECT id, name, nationality, birth_year FROM authors WHERE id = $1', [id])).rows[0] ?? null;
  }
  async create(data: NewAuthor) {
    return (await pool.query(
      'INSERT INTO authors (name, nationality, birth_year) VALUES ($1, $2, $3) RETURNING id, name, nationality, birth_year',
      [data.name, data.nationality ?? null, data.birth_year ?? null]
    )).rows[0];
  }
  async update(id: number, data: Partial<NewAuthor>) {
    return (await pool.query(
      `UPDATE authors SET name = COALESCE($2, name), nationality = COALESCE($3, nationality),
       birth_year = COALESCE($4, birth_year) WHERE id = $1
       RETURNING id, name, nationality, birth_year`,
      [id, data.name ?? null, data.nationality ?? null, data.birth_year ?? null]
    )).rows[0] ?? null;
  }
  async delete(id: number) {
  const result = await pool.query(
    'DELETE FROM authors WHERE id = $1 RETURNING id',
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}
}

