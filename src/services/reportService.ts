import { ReportRepository } from '../repositories/reportRepository';

export class ReportService {
  constructor(private repository = new ReportRepository()) {}
  booksByAuthor() { return this.repository.booksByAuthor(); }
  loansByCustomer() { return this.repository.loansByCustomer(); }
  booksByGenre() { return this.repository.booksByGenre(); }
  topBooks() { return this.repository.topBooks(); }
  availableBooks() { return this.repository.availableBooks(); }
    borrowedBooks() {
    return this.repository.borrowedBooks();
  }

  loansByBook() {
    return this.repository.loansByBook();
  }

  customersWithActiveLoans() {
    return this.repository.customersWithActiveLoans();
  }
}
