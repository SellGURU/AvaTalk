/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
}
function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
}
export default ProtectedRoute;
