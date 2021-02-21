import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(tokenId: string) {
    const userToken = await this.findOne(tokenId);

    return userToken;
  }

  public async findById(tokenId: string) {
    const userToken = await this.findOne(tokenId);

    return userToken;
  }

  public async generate(userId: string) {
    const userToken = this.create({ userId });

    await this.save(userToken);

    return userToken;
  }

  public async getTokenNotUsed(userId: string) {
    return this.findOne({
      where: { userId, status: false }
    })
  }
}
