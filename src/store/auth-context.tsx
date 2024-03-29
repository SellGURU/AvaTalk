/* eslint-disable no-undef */
/* eslint-disable-next-line no-unused-vars*/

import { createContext, PropsWithChildren, useState } from "react";
import {removeTokenFromLocalStorage, storeTokenInLocalStorage } from "../Storage/Token";
import {User} from "../Model";
import { reolveJsonToObject } from "../help";
import { Auth } from "../Api";

interface VerificationProps {
  emailOrPhone:string;
}

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  varification:VerificationProps;
  currentUser:User;
  setUser:(user:User) => void;
  login: (token: string) => void;
  verificationHandler: (verification:VerificationProps) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  isLoggedIn: false,
  varification:{
    emailOrPhone:''
  },
  setUser:() => {},
  currentUser: new User(),
  verificationHandler: () => {},
  login: () => {},
  logout: () => {
    // Auth.logout()
    // localStorage.clear()
  },
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const localuser = localStorage.getItem('authUser')
  reolveJsonToObject(localuser as string)
  // Object.assign(new User(),JSON.parse(localStorage.getItem('authUser')))
  const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
  resolveUser.setBox(reolveJsonToObject(localuser as string))

  const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
  const [verification,setVerification] = useState<VerificationProps>(
    {
      emailOrPhone:''
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
