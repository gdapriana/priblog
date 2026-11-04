import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const authenticated = false;
  if (!authenticated) return <Navigate to={"/login"} />;
  return <Outlet />;
};
