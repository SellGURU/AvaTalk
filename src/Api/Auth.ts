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
  fullName: string;
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

  static getAllContacts(callBack: (data: Array<ContactData>) => void) {
    this.post("/contactsInfo", {}).then((res) => {
      const contactDataArray: Array<ContactData> = res.data.map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        image: item.image,
        Exhibition: item.Exhibition,
        Exchange: item.Exchange,
        phone: item.phone,
        location: item.location,
        company: item.company,
        meetDate: item.meetDate,
        addDate: item.addDate,
        job: item.job,
      }));
      callBack(contactDataArray);
    });
  }

  static getContactDetails(contactId: string, callBack: (data: ContactData | null) => void) {
    this.post("/contactDetails", {}).then((res) => {
      // const contact = res.data.find((item: any) => item.id === contactId);
      const contact = res.data[0];

      if (contact) {
        const contactDetails: ContactData = {
          id: contact.id,
          fullName: contact.fullName,
          email: contact.email,
          image: contact.image,
          Exhibition: contact.Exhibition,
          Exchange: contact.Exchange,
          phone: contact.phone,
          location: contact.location,
          company: contact.company,
          meetDate: contact.meetDate,
          addDate: contact.addDate,
          job: contact.job,
        };
        callBack(contactDetails);
      } else {
        callBack(null);
      }
    });
  }
  static updateContact(contactId: string, updatedData: Partial<ContactData>, callBack: () => void) {
    const requestData = {
      contactId,
      updatedData,
    };

    this.post("/contactDetails", requestData).then(() => {
      callBack();
    });
  }
  // static updateContactDetails(contactId: string, updatedData: Partial<ContactData>, callBack: () => void) {
  //   const requestData = {
  //     contactId,
  //     updatedData,
  //   };

  //   // Assuming you are using PATCH method to update contact details
  //   this.patch(`/contactDetails/${contactId}`, requestData).then(() => {
  //     callBack();
  //   });
  // }
}

export default Auth;
