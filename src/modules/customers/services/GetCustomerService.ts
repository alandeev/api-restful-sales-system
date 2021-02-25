import HttpException from "@shared/errors/HttpException";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  customerId: string;
}

class GetCustomerService {
  public async execute({ customerId }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customerId);
    if (!customer) {
      throw new HttpException("Customer not found");
    }

    return customer;
  }
}

export default GetCustomerService;
