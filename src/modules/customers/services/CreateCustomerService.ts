
import HttpException from '@shared/errors/HttpException';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExist = await customersRepository.findByEmail(email);
    if (emailExist) {
      throw new HttpException("Email address already used.");
    }

    const customerModel = customersRepository.create({ name, email });

    await customersRepository.save(customerModel);
  }
}

export default CreateCustomerService;
