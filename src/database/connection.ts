import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'bookstore_db',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD,
});

pool.on('error', (error) => {
  console.error('Erro inesperado no pool PostgreSQL:', error.message);
});

export async function testConnection(): Promise<void> {
  const result = await pool.query('SELECT NOW() AS connected_at');
  console.log(`PostgreSQL conectado em ${result.rows[0].connected_at}`);
}
