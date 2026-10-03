import { BookService } from '../services/bookService';
import { NewBook } from '../models/types';

export class BookController {
  constructor(private service = new BookService()) {}
  list() { return this.service.list(); }
  create(data: NewBook) { return this.service.create(data); }
  update(id: number, data: Partial<NewBook>) { return this.service.update(id, data); }
  delete(id: number) { return this.service.delete(id); }
}
