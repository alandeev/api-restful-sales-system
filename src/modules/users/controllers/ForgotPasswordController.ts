import { Request, Response } from 'express';
import RecoveryPasswordService from '../services/RecoveryPasswordService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService.ts';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    const data = await sendForgotPasswordEmail.execute({ email });

    return response.status(201).json(data);
  }

  public async recovery(request: Request, response: Response): Promise<Response> {

    const recoveryPasswordService = new RecoveryPasswordService();
    await recoveryPasswordService.execute(request.body)

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
