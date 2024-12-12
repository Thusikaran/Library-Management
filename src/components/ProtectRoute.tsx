
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/Service";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
