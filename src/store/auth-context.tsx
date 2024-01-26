/* eslint-disable no-undef */
/* eslint-disable-next-line no-unused-vars*/

import { createContext, PropsWithChildren, useState } from "react";
import { removeTokenFromLocalStorage, storeTokenInLocalStorage } from "../Storage/Token";

interface VerificationProps {
  emailOrPhone:string;
}

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  varification:VerificationProps;
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
  verificationHandler: () => {},
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const [verification,setVerification] = useState<VerificationProps>(
    {
      emailOrPhone:''
    }
  )
  const userIsLoggedIn = !!token;

  function logoutHandler() {
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
    verificationHandler:verificationHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
