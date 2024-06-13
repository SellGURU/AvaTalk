/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable-next-line no-unused-vars*/

import { createContext, PropsWithChildren, useState } from "react";
import {removeTokenFromLocalStorage, storeTokenInLocalStorage } from "../Storage/Token";
import {User} from "../Model";
import { reolveJsonToObject } from "../help";
import { Auth } from "../Api";

interface VerificationProps {
  emailOrPhone:string;
  googleJson:any;
}

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  varification:VerificationProps;
  currentUser:User;
  needReload:boolean
  googleInformation:any
  setGoogleInformation:(info:any) => void
  setNeedReload:(action:boolean) => void;
  setUser:(user:User) => void;
  login: (token: string) => void;
  verificationHandler: (verification:VerificationProps) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  isLoggedIn: false,
  varification:{
    emailOrPhone:'',
    googleJson:{},
  },
  googleInformation:{},
  needReload :false,
  setNeedReload:() => {},
  setUser:() => {},
  currentUser: new User(),
  verificationHandler: () => {},
 setGoogleInformation:() => {}, 
  login: () => {},
  logout: () => {
    // Auth.logout()
    // localStorage.clear()
  },
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const localuser = localStorage.getItem('authUser')
  const [needReload,setNeedReload] = useState(false)
  reolveJsonToObject(localuser as string)
  // Object.assign(new User(),JSON.parse(localStorage.getItem('authUser')))
  const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
  resolveUser.setBox(reolveJsonToObject(localuser as string))
  const [googleInformation,setGoogleInformation] = useState({})
  const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
  const [verification,setVerification] = useState<VerificationProps>(
    {
      emailOrPhone:'',
      googleJson: {}
    }
  )
  const userIsLoggedIn = !!token && !!user.information;

  function logoutHandler() {
    Auth.logout()
    setToken(null);
    // localStorage.removeItem("token");
    removeTokenFromLocalStorage();
  }

  function verificationHandler(verification:VerificationProps) {
    setVerification(verification)
  }

  function loginHandler(token: string) {
    setToken(token);
    // localStorage.setItem("token", token);
    storeTokenInLocalStorage(token);
  }

  const contextValue: AuthContextProps = {
    token,
    isLoggedIn: userIsLoggedIn,
    varification:verification,
    currentUser: user,
    needReload:needReload,
    setNeedReload:setNeedReload,
    setGoogleInformation:setGoogleInformation,
    googleInformation:googleInformation,
    setUser:(user:User) => {
      localStorage.setItem('authUser',JSON.stringify(user))
      // Object.assign(new User(),JSON.parse(localStorage.getItem('authUser')))
      setUser(user)
    },
    verificationHandler:verificationHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
