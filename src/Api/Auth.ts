/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";
// import { toast } from 'react-toastify';

interface LoginData {
  // email: string | null;
  mobile_number: string | null;
  code?:string
}
interface Location {
  lat: number;
  lng: number;
}
interface RegisterData {
  first_name: string;
  last_name: string;
  mobile_number: string | null;
  job_title: string | null;
  company_name: string | null;
  location: Location | null;
  profile_pic: string | null;
}

class Auth extends Api {
  static login(data: LoginData) {
    const response = this.post("/login", data)
    return response
  }
  static get_Login_code(data: LoginData) {
    const response = this.post("/get_Login_code", data)
    return response
  }

  static register(data: RegisterData) {
    const response = this.post("/register", data)
    return response
  }

  static logout() {
    this.post("/logout").then(() => {});
  }
}

export default Auth;
