/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "../Model";
import { boxProvider } from "../help";
import Api from "./Api";

interface LoginData {
  // email: string | null;
  mobile_number: string | null;
  code?: string;
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
export interface ContactData {
  id: string;
  name: string;
  email: string;
  image: string;
  Exhibition: boolean;
  Exchange: boolean;
  phone: string;
  location: string;
  company: string;
  meetDate: string;
  addDate: string;
  job: string;
}

class Auth extends Api {
  static login(data: LoginData) {
    const response = this.post("/login", data);
    return response;
  }
  static get_Login_code(data: LoginData) {
    const response = this.post("/get_Login_code", data);
    return response;
  }

  static register(data: RegisterData) {
    const response = this.post("/register", data);
    return response;
  }

  static logout() {
    this.post("/logout").then(() => {});
  }

  static getBoxs(resolve: (data: Array<Box>) => void) {
    const resolveSocial: Array<Box> = [];
    this.post("/profileInfo", {}).then((res) => {
      res.data.map((item: any) => {
        const newBox = boxProvider(item);
        resolveSocial.push(newBox);
      });
      resolve(resolveSocial);
    });
  }
  static contactBoxs(resolve: (data: Array<ContactData>) => void) {
    const resolveSocial: Array<ContactData> = [];
    this.post("/contactInfo", {}).then((res) => {
      res.data.map((item: any) => {
        const newBox = boxProvider(item);
        resolveSocial.push(newBox);
      });
      resolve(resolveSocial);
    });
  }
  static getContactDetails(contactId: string, resolve: (data: ContactData | null) => void) {
    this.post("/contactInfo", {}).then((res) => {
      const contact = res.data.find((item: any) => item.id === contactId);
      if (contact) {
        const contactDetails = boxProvider(contact);
        resolve(contactDetails);
      } else {
        resolve(null); // Contact not found
      }
    });
  }
}

export default Auth;
