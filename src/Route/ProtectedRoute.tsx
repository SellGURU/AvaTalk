/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
}
function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  const [parametr] = useSearchParams() 
  if (!isLoggedIn) {
    return <Navigate to={"/login"} state={{via:parametr.get("via"),referral:parametr.get("referral")}} replace />;
  }
  return <Component />;
}
export default ProtectedRoute;
