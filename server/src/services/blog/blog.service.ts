import { createServiceBlog } from "./create.service.blog.js";
import { deleteServiceBlog } from "./delete.service.blog.js";
import { getServiceBlog } from "./get.service.blog.js";
import { queryServiceBlog } from "./query.service.blog.js";
import { updateServiceBlog } from "./update.service.blog.js";

export class BlogService {
  static GET = getServiceBlog;
  static QUERY = queryServiceBlog;
  static CREATE = createServiceBlog;
  static UPDATE = updateServiceBlog;
  static DELETE = deleteServiceBlog;
}
