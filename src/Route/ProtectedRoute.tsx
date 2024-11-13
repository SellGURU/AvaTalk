/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
}


function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  const [parametr] = useSearchParams() 
  const resolveParameretrs = () => {
    if(parametr.get("referral") && parametr.get("via")){
      return '?via='+parametr.get("via")+"&referral="+parametr.get("referral")
    }
    if(parametr.get("referral")){
      return "?referral="+parametr.get("referral")
    }
    if(parametr.get("via")){
      return "?via="+parametr.get("via")
    }    
    return ''
  }  
  if (!isLoggedIn) {
    return <Navigate to={'/login'+resolveParameretrs()} replace />;
  }
  return <Component />;
}
export default ProtectedRoute;
