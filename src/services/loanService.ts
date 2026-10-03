import { LoanRepository } from '../repositories/loanRepository';

export class LoanService {
  constructor(private repository = new LoanRepository()) {}
  list() { return this.repository.list(false); }
  active() { return this.repository.list(true); }
  create(bookId: number, customerId: number) {
    if (!Number.isInteger(bookId) || bookId <= 0) throw new Error('ID de livro inválido.');
    if (!Number.isInteger(customerId) || customerId <= 0) throw new Error('ID de cliente inválido.');
    return this.repository.create(bookId, customerId);
  }
  returnLoan(id: number) {
    if (!Number.isInteger(id) || id <= 0) throw new Error('ID de empréstimo inválido.');
    return this.repository.returnLoan(id);
  }
}
