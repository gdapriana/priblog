import { type Response, type Request } from "express";
import { UserMeResponse } from "../../db/schema.js";

export const meServiceAuth = async (req: Request): Promise<UserMeResponse> => {
  return req.user;
};
