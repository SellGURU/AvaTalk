import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification, Spinner, CreateAccount } from "../Pages";
import ProtectedRoute from "./ProtectedRoute";

const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
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
  {
    path: "/splash",
    element: <Splash/>
  },
]);

export default route;
