import HttpException from '@shared/errors/HttpException';
import { getCustomRepository, getRepository } from 'typeorm';
import Upload from '../typeorm/entities/Upload';
import UserPerfil from '../typeorm/entities/UserPerfil';
import { UserPerfilRepository } from '../typeorm/repositories/UserPerfilRepository';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  originalname: string;
  mimetype: string;
  filename: string;
  size: number;
}

class SetUserAvatarService {
  public async execute(user_id: string, { originalname, mimetype, filename, size }: IRequest): Promise<void> {
    const uploadRepository = getRepository(Upload);
    const userRepository = getCustomRepository(UserRepository);
    const userPerfilRepository = getRepository(UserPerfil);

    const user = await userRepository.findOne(user_id, {
       relations: ["perfil"]
    });

    if(!user) {
      throw new HttpException("User not found", 401);
    }

    const { perfil } = user;
    console.log(perfil);

    if(perfil.avatar) {
      console.log({ perfil:'já tem' })
    }

    const upload = uploadRepository.create({ originalname, mimetype, filename, size });
    perfil.avatar = upload;

    await userPerfilRepository.save(perfil)
  }
}

export default SetUserAvatarService;
