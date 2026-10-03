-- Execute conectado a um usuário que tenha permissão para criar bancos.
-- Se o banco já existir, pule a linha CREATE DATABASE e conecte-se a ele.
CREATE DATABASE bookstore_db;

\connect bookstore_db;

CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  nationality VARCHAR(100),
  birth_year INTEGER CHECK (birth_year IS NULL OR birth_year BETWEEN 0 AND 2100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  genre VARCHAR(100),
  publication_year INTEGER CHECK (publication_year IS NULL OR publication_year BETWEEN 0 AND 2100),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 0),
  available INTEGER NOT NULL DEFAULT 1 CHECK (available >= 0 AND available <= quantity),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) UNIQUE,
  phone VARCHAR(30),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL DEFAULT (CURRENT_DATE + 14),
  returned_at DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_books_author_id ON books(author_id);
CREATE INDEX IF NOT EXISTS idx_loans_book_id ON loans(book_id);
CREATE INDEX IF NOT EXISTS idx_loans_customer_id ON loans(customer_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON loans(status);
