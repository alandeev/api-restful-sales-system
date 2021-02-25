import HttpException from '@shared/errors/HttpException';
import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  userId: string;
}
export class GetUserService {
  public async execute({ userId }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', 401);
    }

    return user;
  }
}
