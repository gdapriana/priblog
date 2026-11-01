import { getServiceCategory } from "./get.service.category.js";
import { queryServiceCategory } from "./query.service.category.js";

export class CategoryService {
  static GET = getServiceCategory;
  static QUERY = queryServiceCategory;
}
