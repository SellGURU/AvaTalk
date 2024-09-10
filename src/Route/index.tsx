import { createHashRouter } from "react-router-dom";
import {  Login, Verification, Spinner, CreateAccount, Splash, Dev, Edit, EditAbout, Setting, Share, Home2, SignUp, RegisterVerification, ForgetPassword, LinkedInCallback } from "../Pages";

import ContactPage from "../Pages/ContactPage";

import Presentations from "../Pages/Presentations";
import ProtectedRoute from "./ProtectedRoute";
import { Chat, ContactsView, Profile2 } from "../Components";
import { EditAiSetting, EditAvater,EditAvailability, EditContactInfo, EditFile, EditGallery, EditGoogleMap, EditLinks, EditSocials, EditVideos } from "../Pages/EditPages";
import ChatPage from "../Pages/ChatPage";
import AnalyticsPage from "../Pages/AnalyticsPage";
import { ReferYourFriends, SettingAccount, SettingConnectedAccount, SettingPayment, SettingPrivacyPolicy, SettingService, SettingSharing, SettingSupport, SettingTermsService , SettingHelp, HelpSupport } from "../Pages/SettingPages";
import OnBoarding from "../Pages/SignUp/onboardingSteps";
import {OrderNfcCard} from "../Pages/SettingPages/OrderNfcCard";
import {NFCBusinessCard} from "../Pages/NFCBusinessCard";
import ResetPassword from "../Pages/ResetPassword";
import {Tutorial} from "../Pages/Tutorial";

const route = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Home2} />,

    children: [
      {
        path: "/",
        element: <Profile2 theme="Carbon"></Profile2>,
        children: [
          {
            path: "edit",
            element: <Edit></Edit>,
            children: [
              {
                path: "contact-info",
                element: <EditContactInfo></EditContactInfo>,
              },
              {
                path: "avatars",
                element: <EditAvater></EditAvater>,
              },              
              {
                path: "about",
                element: <EditAbout></EditAbout>,
              },
              {
                path: "availability",
                element: <EditAvailability></EditAvailability>
              },
              {
                path: "links",
                element: <EditLinks></EditLinks>,
              },
              {
                path: "gallery",
                element: <EditGallery></EditGallery>,
              },
              {
                path: "socials",
                element: <EditSocials></EditSocials>,
              },
              {
                path: "googlemap",
                element: <EditGoogleMap></EditGoogleMap>,
              },
              {
                path:"files",
                element:<EditFile></EditFile>
              },
              {
                path: "ai-setting",
                element: <EditAiSetting></EditAiSetting>,
              },
              {
                path: "videos",
                element: <EditVideos></EditVideos>,
              },
            ],
          },
        ],
      },
      // {
      //   path: "/home",
      //   element: <Profile2 theme="Carbon"></Profile2>,
      // },      
      {
        path: "/contacts",
        element: <ContactsView theme="Carbon"></ContactsView>,
        children: [
          {
            path: ":contactId",
            element: <ContactPage />,
          },
        ],
      },
      {
        path: "/anaylitics",
        element: <AnalyticsPage></AnalyticsPage>,
        // children: [
        //   {
        //     path: ":contactId",
        //     element: <ContactPage />,
        //   },
        // ],
      },
      {
        path: "/settings",
        element: <Setting></Setting>,
        children: [
          {
            path: "account",
            element: <SettingAccount></SettingAccount>,
          },
          {
            path: "connectedaccount",
            element: <SettingConnectedAccount></SettingConnectedAccount>,
          },
          {
            path: "sharing",
            element: <SettingSharing></SettingSharing>,
          },
          {
            path: "service",
            element: <SettingService></SettingService>,
          },
          {
            path: "payment",
            element: <SettingPayment></SettingPayment>,
          },
          {
            path: "privacypolicy",
            element: <SettingPrivacyPolicy></SettingPrivacyPolicy>,
          },
          {
            path: "termsservice",
            element: <SettingTermsService></SettingTermsService>,
          },
          {
            path: "support",
            element: <SettingSupport></SettingSupport>,
          },
          {
            path: "help",
            element: <SettingHelp></SettingHelp>,
            children : [
              {
                path: "support",
                element: <HelpSupport></HelpSupport>
              },
              {
                path: "tutorial",
                element: <Tutorial></Tutorial>
              }
            ]
          },
          //   CartTu
          {
            path: "refer",
            element: <ReferYourFriends></ReferYourFriends>,
          },
          {
            path: "OrderNFCCard",
            element: <OrderNfcCard></OrderNfcCard>,
          },
          {
            path: "NFCBusinessCard",
            element: <NFCBusinessCard></NFCBusinessCard>,
          },
       
        ],
        // children:[
        //   {
        //     path: ":contactId",
        //     element: <ContactPage />,
        //   },
        // ]
      },
      {
        path: "/chats",
        element: <Chat theme="Carbon" />,
        children: [
          {
            path: ":chatId",
            element: <ChatPage />,
          },
        ],
      },
    ],
    // element: <Home></Home>,
  },
  {
    path: "/dev",
    element: <Dev></Dev>,
  },
  {
    path:'/linkedin/callback',
    element:<LinkedInCallback></LinkedInCallback>
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  }, 
  {
    path: "/forgetPassword",
    element: <ForgetPassword></ForgetPassword>,
  },   
  {
    path: "/resetPassword",
    element: <ResetPassword></ResetPassword>,
  },    
  {
    path: "/createAccount",
    element: <OnBoarding></OnBoarding>,
  },     
  {
    path: "/Verification",
    element: <Verification></Verification>,
  },
  {
    path: "/RVerification",
    element: <RegisterVerification></RegisterVerification>,
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
    path:'/share',
    element:<Share></Share>
  },
  {
    path:'/A/:id',
    element:<Share></Share>
  },  
  {
    path: "/presentation",
    element: <Presentations />,
  },
]);

export default route;
