import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  findById(customerId: string): Promise<Customer | undefined> {
    return this.findOne(customerId);
  }

  findByName(name: string): Promise<Customer | undefined> {
    return this.findOne({
      where: { name },
    });
  }

  findByEmail(email: string): Promise<Customer | undefined> {
    return this.findOne({
      where: { email },
    });
  }
}


export default CustomersRepository;
