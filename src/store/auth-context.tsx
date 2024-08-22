/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable-next-line no-unused-vars*/

import { createContext, PropsWithChildren, useState } from "react";
import {removeTokenFromLocalStorage, storeTokenInLocalStorage } from "../Storage/Token";
import {User} from "../Model";
import { reolveJsonToObject } from "../help";
import { Auth } from "../Api";
import UserType from "../Model/UserType";

interface VerificationProps {
  emailOrPhone:string;
  googleJson:any;
}

interface SiginUpOptionProps {
  firstName:string
  lastName:string
  email:string
  gender:"female"| "male"| ''
  phone:string;
}

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  varification:VerificationProps;
  currentUser:User;
  siginUpOptions:SiginUpOptionProps;
  needReload:boolean
  googleInformation:any
  nfc_id:string | null
  refrealCode:string| null
  setReferalCode:(referal:string) => void
  setNfc_id:(id:string| null) => void
  setGoogleInformation:(info:any) => void
  setNeedReload:(action:boolean) => void;
  setUser:(user:User) => void;
  login: (token: string) => void;
  verificationHandler: (verification:VerificationProps) => void;
  siginupHandler:(siginup:any) =>void
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  isLoggedIn: false,
  varification:{
    emailOrPhone:'',
    googleJson:{},
  },
  siginUpOptions:{
    firstName:'',
    gender:'',
    email:'',
    lastName:'',
    phone:''
  },
  refrealCode:'',
  setReferalCode:() =>{},
  nfc_id:'',
  setNfc_id:() =>{},
  googleInformation:{},
  needReload :false,
  siginupHandler:() => {},
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
  const [referalCode,setReferalCode] = useState('')
  const [needReload,setNeedReload] = useState(false)
  reolveJsonToObject(localuser as string)
  // Object.assign(new User(),JSON.parse(localStorage.getItem('authUser')))
  const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
  resolveUser.setBox(reolveJsonToObject(localuser as string))
  resolveUser.setTypeOfAccount(new UserType('Free',new Date()))
  const [googleInformation,setGoogleInformation] = useState({})
  const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
  const [nfc_id,setNfc_id] = useState<string|null>('')
  const [verification,setVerification] = useState<VerificationProps>(
    {
      emailOrPhone:'',
      googleJson: {}
    }
  )

  const [siginOptions,setSiginOptions] = useState<SiginUpOptionProps>({
    firstName:'',
    gender:'',
    lastName:'',
    email:'',
    phone:''
  })
  // const userIsLoggedIn = !!token && !!user.information;

  function logoutHandler() {
    Auth.logout()
    setToken(null);
    // localStorage.removeItem("token");
    removeTokenFromLocalStorage();
  }

  function verificationHandler(verification:VerificationProps) {
    setVerification(verification)
  }
  function siginOptionsHandler(siginValues:any) {
    setSiginOptions({...siginOptions,...siginValues})
  }

  function loginHandler(token: string) {
    setToken(token);
    // localStorage.setItem("token", token);
    storeTokenInLocalStorage(token);
  }

  const contextValue: AuthContextProps = {
    token,
    isLoggedIn: !!token ,
    refrealCode:referalCode,
    setReferalCode:setReferalCode,
    varification:verification,
    siginUpOptions:siginOptions,
    currentUser: user,
    needReload:needReload,
    setNeedReload:setNeedReload,
    setGoogleInformation:setGoogleInformation,
    googleInformation:googleInformation,
    nfc_id:nfc_id,
    setNfc_id:setNfc_id,
    setUser:(user:User) => {
      localStorage.setItem('authUser',JSON.stringify(user))
      // Object.assign(new User(),JSON.parse(localStorage.getItem('authUser')))
      setUser(user)
    },
    verificationHandler:verificationHandler,
    siginupHandler:siginOptionsHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
