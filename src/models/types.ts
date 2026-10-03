export interface Author {
  id: number;
  name: string;
  nationality: string | null;
  birth_year: number | null;
}

export interface Book {
  id: number;
  title: string;
  author_id: number;
  author_name?: string;
  genre: string | null;
  publication_year: number | null;
  quantity: number;
  available: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface Loan {
  id: number;
  book_id: number;
  book_title?: string;
  customer_id: number;
  customer_name?: string;
  loan_date: string;
  due_date: string;
  returned_at: string | null;
  status: 'active' | 'returned';
}

export type NewAuthor = Pick<Author, 'name'> & Partial<Pick<Author, 'nationality' | 'birth_year'>>;
export type NewBook = Pick<Book, 'title' | 'author_id'> & Partial<Pick<Book, 'genre' | 'publication_year' | 'quantity'>>;
export type NewCustomer = Pick<Customer, 'name'> & Partial<Pick<Customer, 'email' | 'phone'>>;
