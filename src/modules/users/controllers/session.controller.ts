import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';
import { ListUserService } from '../services/ListUserService';
import RecoveryPasswordService from '../services/RecoveryPasswordService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService.ts';
import SessionsUserService from '../services/SessionsUserService';

class UserController {
  public async authorize(request: Request, response: Response): Promise<Response> {
    const sessionsUserService = new SessionsUserService();

    const user = await sessionsUserService.execute(request.body);

    return response.json(user);
  }

  public async oAuth(request: Request, response: Response): Promise<Response> {
    const getUserService = new GetUserService();
    const user = await getUserService.execute(request.user.id);

    return response.json(user);
  }

  public async recovery(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
    const { user_id, token } = await sendForgotPasswordEmailService.execute(request.body);

    return response.json({ user_id, token });
  }

  public async changepwd(request: Request, response: Response): Promise<Response> {
    const recoveryPasswordService = new RecoveryPasswordService();
    const user = await recoveryPasswordService.execute(request.body);

    return response.json(user);
  }
}

export default UserController;
