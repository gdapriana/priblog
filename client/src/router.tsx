import { createBrowserRouter } from "react-router";
import Homepage from "./pages/home.page";
import Blogspage from "./pages/blogs.page";
import { AuthLayout, MainLayout } from "./layout";
import RegisterAuthPage from "./pages/auth/register.auth.page";
import LoginAuthPage from "./pages/auth/login.auth.page";
import BlogPage from "./pages/blog.page";
import Categoriespage from "./pages/categories.page";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Homepage },
      { path: "blogs", Component: Blogspage },
      { path: "categories", Component: Categoriespage },
      { path: "/blogs/:slug", Component: BlogPage },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "register", Component: RegisterAuthPage },
      { path: "login", Component: LoginAuthPage },
    ],
  },
]);

export default router;
