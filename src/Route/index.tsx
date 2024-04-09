import { createHashRouter } from "react-router-dom";
import { Home2, Login, Verification, Spinner, CreateAccount, Splash, Dev, Edit, EditAbout } from "../Pages";

import ContactPage from "../Pages/ContactPage";

import Presentations from "../Pages/Presentations";
import ProtectedRoute from "./ProtectedRoute";
import { Chat, ContactsView, Profile2 } from "../Components";
import { EditGallery, EditGoogleMap, EditVideos } from "../Pages/EditPages";

const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Home2} />,

    children: [
      {
        path: "/",
        element: <Profile2 theme="Carbon"></Profile2>,
        children:[
          {
            path:'edit',
            element:<Edit></Edit>,
            children:[
              {
                path:'about',
                element:<EditAbout></EditAbout>
              },
              {
                path:'gallery',
                element:<EditGallery></EditGallery>
              },
              {
                path:'googlemap',
                element:<EditGoogleMap></EditGoogleMap>
              },      
              {
                path:'videos',
                element:<EditVideos></EditVideos>
              }                                          
            ]
          }
        ]
      },
      {
        path: "/contacts",
        element: <ContactsView theme="Carbon"></ContactsView>,
        children:[
          {
            path: ":contactId",
            element: <ContactPage />,
          },
        ]
      },
      {
        path: "/chats",
        element: <Chat theme="Carbon"/>,
      },      
    ],
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
  // {
  //   path: "/contacts/:contactId",
  //   element: <ContactPage />,
  // },
  {
    path: "/presentation",
    element: <Presentations />,
  },
  // {
  //   path: "/chat",
  //   element: <Chats/>,
  // },
]);

export default route;
