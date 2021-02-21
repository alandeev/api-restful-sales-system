import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne({
      where: { token }
    })

    return userToken;
  }

  public async findById(id: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne(id);

    return userToken;
  }

  public async generate(user_id: string) {
    const userToken = this.create({ user_id });

    await this.save(userToken);

    return userToken;
  }
}
