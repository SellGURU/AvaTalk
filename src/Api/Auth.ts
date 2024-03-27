/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "../Model";
import { Contact, Tag } from "../Types";
import { boxProvider } from "../help";
import Api from "./Api";

interface LoginData {
  // email: string | null;
  mobile_number?: string | null;
  email?:string;
  entered_code?: string;
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
  email:string | null
}

// interface ContactType {
//   name: string;
//   email: string;
//   phone: string;
// }

// export interface TagsData {
//   id: string;
//   tag: string;
//   color: string;
//   contacts: ContactType[];
// }

class Auth extends Api {
  static login(data: LoginData) {
    const response = this.post("/check_Login_code", data);
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

  static showProfile(resolve: (data:any) => void){
    this.post('/show_profile',{}).then(res => {
      resolve(res.data)
    })
  }

  static getAllContacts(resolve: (data: Array<Contact>) => void) {
    this.post("/contactsInfo", {}).then((res) => {
      resolve(res.data);
    });
  }

  static getContactDetails(_contactId: string, resolve: (data: Contact) => void) {
    // this.post("/contactDetails", {id:_contactId}).then((res) => {
    //   resolve(res.data);
    // });
    this.getAllContacts((data) => {
      resolve(data.filter((item) =>item.id == _contactId)[0]?data.filter((item) =>item.id == _contactId)[0]:data[0])
    })
  }

  static editContact(_contactId: string, data: Partial<Contact>, submit: (res: any) => void) {
    const endpoint = "/contactDetails";
    this.post(endpoint, data).then((res) => submit(res));
  }

  static getAllTags(resolve: (data: Array<Tag>) => void) {
    this.post("/tagsInfo").then((res) => {
      resolve(res.data);
    });
  }

  static getTagDetails(_tagId: string, resolve: (data: Tag) => void) {
    this.post("/tagDetails", {}).then((res) => {
      resolve(res.data);
    });
  }

  static updateProfilePic(profile_pic:string){
    this.post('/change_profile_pic',{profile_pic:profile_pic}).then(res => {
      console.log(res)
    })
  }

  static updateBackPic(profile_pic:string){
    this.post('/change_back_ground_pic',{back_ground_pic:profile_pic}).then(res => {
      console.log(res)
    })
  }
  
  static addBox(box:Box) {
    this.post('/update_more_info',{
      title:box.getTitle(),
      type_name:box.getTypeName(),
      content:box
    }).then(res => {
      console.log(res)
    })
  }

  static deleteBox(boxType:string) {
    this.post('/delete_more_info',{type_name:boxType}).then(() => {

    })
  }
}

export default Auth;
