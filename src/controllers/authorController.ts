import { AuthorService } from '../services/authorService';
import { NewAuthor } from '../models/types';

export class AuthorController {
  constructor(private service = new AuthorService()) {}
  list() { return this.service.list(); }
  get(id: number) { return this.service.get(id); }
  create(data: NewAuthor) { return this.service.create(data); }
  update(id: number, data: Partial<NewAuthor>) { return this.service.update(id, data); }
  delete(id: number) { return this.service.delete(id); }
}
