import { createServiceCategory } from "./create.service.category.js";
import { deleteServiceCategory } from "./delete.service.category.js";
import { getServiceCategory } from "./get.service.category.js";
import { queryServiceCategory } from "./query.service.category.js";
import { updateServiceCategory } from "./update.service.category.js";

export class CategoryService {
  static GET = getServiceCategory;
  static QUERY = queryServiceCategory;
  static CREATE = createServiceCategory;
  static UPDATE = updateServiceCategory;
  static DELETE = deleteServiceCategory;
}
