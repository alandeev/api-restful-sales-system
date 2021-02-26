import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
export interface IPaginationCustomer<T> {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: null | number;
  next_page: null | number;
  data: T[]
}

class ListCustomerService {
  public async execute(): Promise<IPaginationCustomer<Customer>> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginationCustomer<Customer>;
  }
}

export default ListCustomerService;
