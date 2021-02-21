import { request } from "express";

export interface ITokenDecoded {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: ITokenDecoded
    }
  }
}
