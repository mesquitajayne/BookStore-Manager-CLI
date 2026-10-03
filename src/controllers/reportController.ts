import { ReportService } from '../services/reportService';

export class ReportController {
  constructor(private service = new ReportService()) {}
  booksByAuthor() { return this.service.booksByAuthor(); }
  loansByCustomer() { return this.service.loansByCustomer(); }
  booksByGenre() { return this.service.booksByGenre(); }
  topBooks() { return this.service.topBooks(); }
  availableBooks() { return this.service.availableBooks(); }
}
