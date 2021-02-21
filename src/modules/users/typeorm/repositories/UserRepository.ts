import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined>  {
    return this.findOne({
      where: { email }
    })
  }

  findById(user_id: string): Promise<User | undefined> {
    return this.findOne(user_id);
  }
}
