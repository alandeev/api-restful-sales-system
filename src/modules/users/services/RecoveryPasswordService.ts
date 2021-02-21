import HttpException from '@shared/errors/HttpException';
import bcrypt from 'bcryptjs'
import { isAfter, addHours } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  new_password: string;
}

class RecoveryPasswordService {
  public async execute({ token, new_password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const _token = await userTokensRepository.findByToken(token);
    if(!_token) {
      throw new HttpException("Token not found", 401);
    }

    if(_token.status) {
      throw new HttpException("Token was used", 401);
    }

    const user = await userRepository.findById(_token.user_id);
    if(!user) {
      throw new HttpException("User not exists", 401);
    }

    const { created_at } = _token;

    const compareDate = addHours(created_at, 2);

    if(isAfter(Date.now(), compareDate)) {
      throw new HttpException("Token expired", 401);
    }

    const hashPassword = await bcrypt.hash(new_password, 8);

    user.password = hashPassword;
    await userRepository.save(user)

    _token.status = true;
    await userTokensRepository.save(_token)

    return user;
  }
}

export default RecoveryPasswordService;
