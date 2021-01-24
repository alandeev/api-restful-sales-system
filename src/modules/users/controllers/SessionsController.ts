import { Request, Response } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const data = await createSessionService.execute({ email, password });

    return response.json(data);
  }
}
