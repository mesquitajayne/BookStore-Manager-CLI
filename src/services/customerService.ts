import { CustomerRepository } from '../repositories/customerRepository';
import { NewCustomer } from '../models/types';

export class CustomerService {
  constructor(private repository = new CustomerRepository()) {}
  list() { return this.repository.list(); }
    get(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Informe um ID válido.');
    }

    return this.repository.get(id);
  }
  async create(data: NewCustomer) {
    if (!data.name?.trim()) throw new Error('Nome do cliente é obrigatório.');
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('E-mail inválido.');
    return this.repository.create({ ...data, name: data.name.trim() });
  }
  async update(id: number, data: Partial<NewCustomer>) {
    const result = await this.repository.update(id, data);
    if (!result) throw new Error('Cliente não encontrado.');
    return result;
  }
  async delete(id: number) {
    if (!await this.repository.delete(id)) throw new Error('Cliente não encontrado.');
  }
}
