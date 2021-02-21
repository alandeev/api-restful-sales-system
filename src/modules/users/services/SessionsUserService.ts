import HttpException from '@shared/errors/HttpException';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { tokenConfig } from '@config/auth.config';

interface IRequest {
  email: string;
  password: string;
}

class SessionsUserService {
  public async execute({ email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);
    if(!user) {
      throw new HttpException("User not exists", 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
      throw new HttpException("Password is invalid", 401);
    }

    const token = jwt.sign({ id: user.id }, tokenConfig.secret, {
      expiresIn: tokenConfig.expireIn
    });

    return token;
  }
}

export default SessionsUserService;
