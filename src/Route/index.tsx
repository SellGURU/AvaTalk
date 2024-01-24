import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification, Spinner, CreateAccount, Splash, Contacts, Dev ,  } from "../Pages";
import Presentations from "../Pages/Presentations";
import ProtectedRoute from "./ProtectedRoute";

const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Home}/>,
    // element: <Home></Home>,
  },
  {
    path: "/dev",
    element: <Dev></Dev>,
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
    element: <Splash />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/presentation",
    element: <Presentations/>,
  },
]);

export default route;
