import { pool } from '../database/connection';
import { NewCustomer } from '../models/types';

export class CustomerRepository {
  async list() {
    return (await pool.query('SELECT id, name, email, phone FROM customers ORDER BY name')).rows;
  }
  async get(id: number) {
    return (await pool.query('SELECT id, name, email, phone FROM customers WHERE id=$1', [id])).rows[0] ?? null;
  }
  async create(data: NewCustomer) {
    return (await pool.query(
      'INSERT INTO customers (name, email, phone) VALUES ($1,$2,$3) RETURNING id,name,email,phone',
      [data.name, data.email ?? null, data.phone ?? null]
    )).rows[0];
  }
  async update(id: number, data: Partial<NewCustomer>) {
    return (await pool.query(
      `UPDATE customers SET name=COALESCE($2,name), email=COALESCE($3,email), phone=COALESCE($4,phone)
       WHERE id=$1 RETURNING id,name,email,phone`,
      [id, data.name ?? null, data.email ?? null, data.phone ?? null]
    )).rows[0] ?? null;
  }
  async delete(id: number) {
    return (await pool.query('DELETE FROM customers WHERE id=$1 RETURNING id', [id])).rowCount > 0;
  }
}
