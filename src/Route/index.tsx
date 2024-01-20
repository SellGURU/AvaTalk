import { Navigate, createHashRouter } from "react-router-dom";
import { Home, Login, Verification, Spinner, CreateAccount } from "../Pages";
import { useAuth } from "../hooks/useAuth";
const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedHome></ProtectedHome>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/Verification",
    element: <Verification></Verification>,
  },
  {
    path: "/Spinner",
    element: <Spinner></Spinner>,
  },
  {
    path: "/register",
    element: <CreateAccount></CreateAccount>,
  },
]);

export default route;

function ProtectedHome() {
  const { isLoggedIn } = useAuth();

  // Check if the user is logged in
  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    // You can replace this with your preferred navigation mechanism
    return <Navigate to="/login" replace />;
  }

  // Render the Home component if the user is logged in
  return <Home />;
}
