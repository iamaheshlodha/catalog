import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = true

  return !isAuthenticated ? children : <Navigate to="/home" replace />;
};

export default PublicRoute;
