import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';
import { ListUserService } from '../services/ListUserService';

class UserController {
  public async get(request: Request, response: Response): Promise<Response> {
    const getUser = new GetUserService();
    const user = await getUser.execute({ userId: request.user.id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(request.body);

    return response.json(user);
  }
}

export default UserController;
