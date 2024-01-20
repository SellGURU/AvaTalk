/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";
// import { toast } from 'react-toastify';

interface LoginData {
  email: string | null;
  phone: number | null;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  phone: number | null;
  job: string | null;
  company: string | null;
  location: string | null;
  file: string | null;
}

class Auth extends Api {
  static login(data: LoginData, submit: (res: any) => void) {
    this.post("/login", data)
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
