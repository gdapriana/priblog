import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api.error.response.util.js";

export const notFoundMiddleware = (
  req: Request,
  _res: Response,
  _next: NextFunction,
) => {
  throw ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`);
};
