import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

export const MainLayout = () => {
   return (
      <main>
         <header>Header</header>
         <Outlet />
      </main>
   )
}

export const AuthLayout = () => {
   const [authenticated] = useState(true)

   if (authenticated) {
      return <Navigate to="/" />
   };

   return (
      <Outlet />
   )
}
