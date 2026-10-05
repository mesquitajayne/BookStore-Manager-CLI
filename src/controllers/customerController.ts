import { CustomerService } from '../services/customerService';
import { NewCustomer } from '../models/types';

export class CustomerController {
  constructor(private service = new CustomerService()) {}
  list() { return this.service.list(); }
  get(id: number) { return this.service.get(id); }
  create(data: NewCustomer) { return this.service.create(data); }
  update(id: number, data: Partial<NewCustomer>) { return this.service.update(id, data); }
  delete(id: number) { return this.service.delete(id); }
}
