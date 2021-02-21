import HttpException from '@shared/errors/HttpException';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
interface IRequest {
  email: string;
}

interface IResponse {
  token: string;
  user_id: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);
    if(!user) {
      throw new HttpException("E-mail not found", 401);
    }

    const userToken = await userTokensRepository.generate(user.id);

    return {
      token: userToken.id,
      user_id: userToken.user_id
    };
  }
}

export default SendForgotPasswordEmailService;
