/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";
// import { toast } from 'react-toastify';

interface LoginData {
  // email: string | null;
  mobile_number: string | null;
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
  static login(data: LoginData, submit: (res: any) => void) {
    this.post("/login", data)
      .then((res) => {
        submit(res);
      })
      .catch((er) => console.error(er.message));
  }
  static get_Login_code(data: LoginData, submit: (res: any) => void) {
    this.post("/get_Login_code", data)
      .then((res) => {
        submit(res);
      })
      .catch((er) => console.error(er.message));
  }

  static register(data: RegisterData, submit: (res: any) => void) {
    this.post("/register", data)
      .then((res) => {
        submit(res);
      })
      .catch((er) => console.error(er.message));
  }

  static logout() {
    this.post("/logout").then(() => {});
  }
}

export default Auth;
