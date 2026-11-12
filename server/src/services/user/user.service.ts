import { loginServiceAuth } from "./login.service.auth.js";
import { logoutServiceAuth } from "./logout.service.auth.js";
import { meServiceAuth } from "./me.service.auth.js";
import { registerServiceAuth } from "./register.service.auth.js";
import { updateServiceUser } from "./update.service.user.js";

export class UserService {
  static REGISTER = registerServiceAuth;
  static LOGIN = loginServiceAuth;
  static LOGOUT = logoutServiceAuth;
  static UPDATE = updateServiceUser;
  static ME = meServiceAuth;
}
