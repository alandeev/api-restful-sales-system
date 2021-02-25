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
    const { id: userId } = request.user;

    const getUserService = new GetUserService();
    const user = await getUserService.execute({ userId});

    return response.json(user);
  }
}

export default UserController;
