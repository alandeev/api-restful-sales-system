import AppError from '@shared/errors/AppError';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { RequestAuthenticate, IResponseToken } from '@modules/types/Token';

export default function isAuthenticated(request: RequestAuthenticate, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('JWT Token is missing.');
  }

  try {
    const decoded = verify<IResponseToken>(token, authConfig.jwt.secret);
    request.decoded = decoded;

    return next();
  } catch {
    throw new AppError('Token incorrect.');
  }
}
