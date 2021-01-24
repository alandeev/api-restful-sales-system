import { Request, Response } from 'express';

import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ id });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute({ id });

    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}
