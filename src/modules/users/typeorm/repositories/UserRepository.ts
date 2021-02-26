import { EntityRepository, Repository } from 'typeorm';
import { classToClass } from 'class-transformer';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByEmail(email: string, showPassword=false): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return showPassword ? user : classToClass(user);
  }

  public async findById(
    user_id: string,
    showPassword = false
  ): Promise<User | undefined> {
    const user = await this.findOne(user_id);

    return showPassword ? user : classToClass(user);
  }
}
