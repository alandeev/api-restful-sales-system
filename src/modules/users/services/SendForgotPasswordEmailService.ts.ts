import EtherealMail from '@config/mail/EtherealMail';
import HttpException from '@shared/errors/HttpException';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);
    if(!user) {
      throw new HttpException("E-mail not found", 401);
    }

    const tokenAlreadyExist = await userTokensRepository.getTokenNotUsed(user.id);
    if (tokenAlreadyExist) {
      await userTokensRepository.remove(tokenAlreadyExist);
    }

    const userToken = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token: userToken.id,
          link: `http://localhost:3000/reset_password?token=${userToken.id}`
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
