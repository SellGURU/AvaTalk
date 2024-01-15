import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification , Spinner, CreateAccount} from "../Pages";

const route = createHashRouter([
    {
        path: "/",
        element:<Home></Home>,
    },
    {
        path: "/login",
        element:<Login></Login>,
    },
    {
        path: "/Verification",
        element:<Verification></Verification>,
    },
    {
        path: "/Spinner",
        element:<Spinner></Spinner>,
    },
    {
        path: "/register",
        element:<CreateAccount></CreateAccount>,
    }       
])

export default route