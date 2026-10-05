import { BookRepository } from '../repositories/bookRepository';
import { AuthorRepository } from '../repositories/authorRepository';
import { NewBook } from '../models/types';

export class BookService {
  constructor(private books = new BookRepository(), private authors = new AuthorRepository()) {}
  list() { return this.books.list(); }
  async get(id: number) { return this.books.get(id); }
  async create(data: NewBook) {
    if (!data.title?.trim()) throw new Error('Título do livro é obrigatório.');
    if (!Number.isInteger(data.author_id) || data.author_id <= 0) throw new Error('Informe um ID de autor válido.');
    if (!await this.authors.get(data.author_id)) throw new Error('Autor não encontrado.');
    if (data.quantity !== undefined && (!Number.isInteger(data.quantity) || data.quantity < 0)) throw new Error('Quantidade deve ser um inteiro não negativo.');
    return this.books.create({ ...data, title: data.title.trim() });
  }
  async update(id: number, data: Partial<NewBook>) {
    if (data.author_id && !await this.authors.get(data.author_id)) throw new Error('Autor não encontrado.');
    const result = await this.books.update(id, data);
    if (!result) throw new Error('Livro não encontrado.');
    return result;
  }
  async delete(id: number) {
    if (!await this.books.delete(id)) throw new Error('Livro não encontrado.');
  }
}
