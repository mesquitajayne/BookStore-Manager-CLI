import { AuthorRepository } from '../repositories/authorRepository';
import { NewAuthor } from '../models/types';

export class AuthorService {
  constructor(private repository = new AuthorRepository()) {}
  list() { return this.repository.list(); }
  get(id: number) { return this.repository.get(this.validId(id)); }
  async create(data: NewAuthor) {
    if (!data.name?.trim()) throw new Error('Nome do autor é obrigatório.');
    return this.repository.create({ ...data, name: data.name.trim() });
  }
  async update(id: number, data: Partial<NewAuthor>) {
    const result = await this.repository.update(this.validId(id), data);
    if (!result) throw new Error('Autor não encontrado.');
    return result;
  }
  async delete(id: number) {
    const ok = await this.repository.delete(this.validId(id));
    if (!ok) throw new Error('Autor não encontrado.');
  }
  private validId(id: number) {
    if (!Number.isInteger(id) || id <= 0) throw new Error('Informe um ID válido.');
    return id;
  }
}
