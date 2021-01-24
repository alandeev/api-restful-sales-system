import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect password combination', 401);
    }

    if (!authConfig.jwt.secret) {
      throw new AppError('Internal Error', 500);
    }

    const token = sign(
      {
        user_id: user.id,
        name: user.name,
      },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn },
    );

    return { user, token };
  }
}

export default CreateSessionService;
