import HttpException from '@shared/errors/HttpException';
import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';

export class GetUserService {
  public async execute(user_id: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id);
    if(!user) {
      throw new HttpException("User not found", 401);
    }

    return user;
  }
}
