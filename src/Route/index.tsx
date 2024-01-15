import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification } from "../Pages";
import Spinner from "../Pages/Spinner";

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
    }    
])

export default route