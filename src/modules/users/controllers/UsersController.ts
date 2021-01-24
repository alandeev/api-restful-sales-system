import { Request, Response } from 'express';

import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import { RequestAuthenticate } from '@modules/types/Token';

export default class UsersController {
  public async index(request: RequestAuthenticate, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.json({ users, decoded: request.decoded });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}
