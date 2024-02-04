import { createHashRouter } from "react-router-dom";
import { Home, Login, Verification, Spinner, CreateAccount, Splash, Dev, Edit, EditAbout, } from "../Pages";

import ContactPage from "../Pages/ContactPage";

import Presentations from "../Pages/Presentations";
import ProtectedRoute from "./ProtectedRoute";
import { Chat, ContactsView, Profile } from "../Components";
import { EditGallery, EditGoogleMap, EditVideos } from "../Pages/EditPages";
import ChatPage from "../Pages/ChatPage";

const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Home} />,

    children: [
      {
        path: "/",
        element: <Profile theme="Carbon"></Profile>,
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
        children:[
          {
            path: ":chatId",
            element: <ChatPage />,
          },
        ]
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

]);

export default route;
