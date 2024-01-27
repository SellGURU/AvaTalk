import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification, Spinner, CreateAccount, Splash, Dev} from "../Pages";
import Presentations from "../Pages/Presentations";
import ProtectedRoute from "./ProtectedRoute";
import { ContactsView, Profile } from "../Components";


const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Home}/>,
    children:[
      {
        path:'/',
        element:<Profile theme="Carbon"></Profile>
      },
      {
        path:'/contacts',
        element:<ContactsView theme="Carbon"></ContactsView>
      }      
    ]
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
  // {
  //   path: "/contacts",
  //   element: <Contacts />,
  // },
  {
    path: "/presentation",
    element: <Presentations/>,
  },
]);

export default route;
