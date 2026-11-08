import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/auth.context";

export const ProtectedRoute = () => {
  const { status } = useAuth();
  if (status === "unauthenticated") return <Navigate to={"/login"} />;
  return <Outlet />;
};
