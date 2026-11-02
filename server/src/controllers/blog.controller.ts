import { NextFunction, Request, Response } from "express";
import { Blog, BlogCreateResponse, BlogUpdateResponse } from "../db/schema.js";
import { BlogService } from "../services/blog/blog.service.js";
import { ApiResponse } from "../utils/api.response.util.js";
import { CRUD_MESSAGE } from "../constants/status.message.constant.js";

export class BlogController {
  static SCHEMA = "blog";
  static GET = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: Blog = await BlogService.GET({ query: req.query });
      ApiResponse.Success(res, CRUD_MESSAGE.fetched(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };

  static QUERY = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BlogService.QUERY(req.query);
      ApiResponse.Success(res, CRUD_MESSAGE.fetched(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
  static CREATE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: BlogCreateResponse = await BlogService.CREATE({
        body: req.body,
        userId: req.user?.id,
      });
      ApiResponse.Success(res, CRUD_MESSAGE.created(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
  static UPDATE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: BlogUpdateResponse = await BlogService.UPDATE({
        blogId: req.params.blogId as string,
        userId: req.user?.id,
        body: req.body,
      });
      ApiResponse.Success(res, CRUD_MESSAGE.updated(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
  static DELETE = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: BlogUpdateResponse = await BlogService.DELETE({
        blogId: req.params.blogId as string,
        userId: req.user?.id,
      });
      ApiResponse.Success(res, CRUD_MESSAGE.deleted(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
}
