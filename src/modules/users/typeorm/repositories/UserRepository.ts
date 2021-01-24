import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({
      where: { email },
    });
  }

  findByName(name: string): Promise<User | undefined> {
    return this.findOne({
      where: { name },
    });
  }

  findById(id: number): Promise<User | undefined> {
    return this.findOne(id);
  }
}

export default UserRepository;
