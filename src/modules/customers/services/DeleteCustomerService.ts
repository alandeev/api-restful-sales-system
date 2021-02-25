import HttpException from "@shared/errors/HttpException";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest {
  customerId: string;
}

class DeleteCustomerService {
  public async execute({ customerId }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customerId);
    if (!customer) {
      throw new HttpException('Customer not exists');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
