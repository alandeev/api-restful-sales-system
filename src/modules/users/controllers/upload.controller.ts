import { Request, Response } from "express";
import SetUserAvatarService from "../services/SetUserAvatarService";

class UploadController {
  public async setUserAvatar(request: Request, response: Response): Promise<Response> {
    const setUserAvatarService = new SetUserAvatarService();
    await setUserAvatarService.execute(request.user.id, request.file);

    return response.status(204).json();
  }
}

export default UploadController;
