import { NextFunction, Request, Response } from "express";
import { Category } from "../db/schema.js";
import { ApiResponse } from "../utils/api.response.util.js";
import { CRUD_MESSAGE } from "../constants/status.message.constant.js";
import { CategoryService } from "../services/category/category.service.js";

export class CategoryController {
  static SCHEMA = "category";

  static GET = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: Category = await CategoryService.GET(req.query);
      ApiResponse.Success(res, CRUD_MESSAGE.fetched(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };

  static QUERY = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.QUERY(req.query);
      ApiResponse.Success(res, CRUD_MESSAGE.fetched(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
}
