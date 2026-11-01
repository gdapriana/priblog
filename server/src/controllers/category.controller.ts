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

  static CREATE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.CREATE(req.body);
      ApiResponse.Success(res, CRUD_MESSAGE.created(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
  static UPDATE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.UPDATE({
        id: req.params.categoryId as string,
        body: req.body,
      });
      ApiResponse.Success(res, CRUD_MESSAGE.updated(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
  static DELETE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.DELETE({
        id: req.params.categoryId as string,
      });
      ApiResponse.Success(res, CRUD_MESSAGE.deleted(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
}
