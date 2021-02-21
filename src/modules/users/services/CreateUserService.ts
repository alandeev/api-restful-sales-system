import HttpException from '@shared/errors/HttpException';
import User from '../typeorm/entities/User';
import bcrypt from 'bcryptjs';

import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import UserPerfil from '../typeorm/entities/UserPerfil';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userPerfilRepository = getRepository(UserPerfil);

    const emailExists = await userRepository.findByEmail(email);
    if(emailExists) {
      throw new HttpException("Email already exists", 400);
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword
    });

    const perfil = userPerfilRepository.create();
    user.perfil = perfil;

    await userRepository.save(user);

    return user;
  }
}
