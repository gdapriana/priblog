import { loginServiceAuth } from "./login.service.auth.js";
import { registerServiceAuth } from "./register.service.auth.js";

export class UserService {
  static REGISTER = registerServiceAuth;
  static LOGIN = loginServiceAuth;
}
