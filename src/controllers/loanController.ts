import { LoanService } from '../services/loanService';

export class LoanController {
  constructor(private service = new LoanService()) {}
  list() { return this.service.list(); }
  active() { return this.service.active(); }
  create(bookId: number, customerId: number) { return this.service.create(bookId, customerId); }
  returnLoan(id: number) { return this.service.returnLoan(id); }
}
