import { Request } from 'express';

export interface IResponseToken {
  user_id?: string;
  name?: string;
  iat?: number;
  exp?: number;
}

interface IResponseDecoded {
  decoded?: IResponseToken;
}

export type RequestAuthenticate = Request & IResponseDecoded;
