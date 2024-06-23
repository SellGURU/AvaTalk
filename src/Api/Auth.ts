/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { Box } from "../Model";
import { removeTokenFromLocalStorage } from "../Storage/Token";
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
  // Gender: string;
  gender:string | null;
  nfc_id:string|null;
  mobile_number: string | null;
  job_title: string | null;
  company_name: string | null;
  location: Location | null;
  profile_pic: string | null;
  email:string | null
  silent_video_avatar:string | null
  avatar_pic_url:string | null
  referral_code?:string|null
}

///
interface SupportData {
  name: string,
  email: string,
  message: string
}
///

interface AiSetting {
  name:string,
  ai_knowledge:string,
  gender:string
}

interface AccountInfo {
  user_id?:string  
  first_name?:string
  last_name?:string
  email?:string
  mobile_number?:string
  language?:string
  state?:boolean
}

interface AddEvent {
  event_type: 'page_view' | 'add_contact' | 'exchange_contact' | 'more_info' |'share_link',
  userid: string,
  sub_event_category: 'view_link' | 'view_qr_code' | 'view_email' |'view_sms' | 'more_info_socials'|
                      'more_info_about' | 'more_info_gallery' | 'more_info_videos' | 'more_info_links'|
                      'email'|'sms'|'clipboard'|'qr_code'|'share_link'
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

interface UpdateContactInfo {
  job_title:string,
  company_name:string,
  location:any,
  email?:string,
  work_email:string,
  phone?:string,
  work_phone:string
  address?:string
}

class Auth extends Api {
  static login(data: LoginData) {
    const response = this.post("/check_Login_code", data);
    return response;
  }

  static loginWithGoogle(data:any) {
    const response = this.post("/login_with_google",data)
    return response
  }

  static check_user_existence(mobile_number?:string,email?:string) {
    const response = this.post('/check_user_existence',{
      email:email,
      mobile_number:mobile_number
    })
    return response
  }

  static avatarList(data:any) {
    const response = this.post("/avatar_list",data,{noPending:true})
    return response
  }
  static createAvatarVideo(avatar_url:string) {
    const response = this.post('/create_silent_avatar',{avatar_url:avatar_url},{noPending:true})
    return response
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
    this.post("/logout").then(() => {
      removeTokenFromLocalStorage();
    });
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
    this.post('/show_profile',{},{noPending:true}).then(res => {
      resolve(res.data)
    })
  }

  static getAllContacts(resolve: (data: Array<Contact>) => void) {
    this.post("/contactsInfo", {}).then((res) => {
      resolve(res.data);
    });
  }

  static getContactDetails(_contactId: string, resolve: (data: any) => void) {
    this.post("/show_contacts_information", {created_contact_id:_contactId}).then((res) => {
      resolve(res.data);
    });
    // this.getAllContacts((data) => {
    //   resolve(data.filter((item) =>item.id == _contactId)[0]?data.filter((item) =>item.id == _contactId)[0]:data[0])
    // })
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

  static updateProfilePic(profile_pic:string,silent_video_avatar?:string){
    const response = this.post('/change_profile_pic',{profile_pic_url:profile_pic,silent_video_avatar:silent_video_avatar},{noPending:true})
    return response
  }

  static avatarState(){
    const response = this.post('/avatar_video_state',{})
    return response    
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

  static updateBox(allBoxs:Array<Box>){
    this.post('/save_boxes',{box_data:allBoxs},{noPending:true})
  }
  ///
  static support(data: SupportData) {
    this.post('/support', data)
      .then(res => {
        console.log(res);
      });
  }
  ///

  static deleteBox(boxType:string) {
    this.post('/delete_more_info',{type_name:boxType}).then(() => {

    })
  }

  static updateAiSetting(data:AiSetting) {
    this.post('/update_ai_setting',data).then((res) => {
      toast.info(res.data)
    })
  }
  static showAiSetting(resolve:(data:any) =>void) {
    this.post('/show_ai_setting',{}).then((res) => resolve(res.data))
  }  

  static updateYourAccount(data:AccountInfo){
    const response = this.post('/update_your_account',data)
    return response
  }

  static addEvent(event:AddEvent) {
    this.post('/add_event',event,{noPending:true})
  }

  static getAnalytics(from:string,to:string,resolve:(data:any) => void){
    this.post('/analytics',{from_date:from,to_date:to}).then(res => {
      resolve(res.data)
    })
  }



  static getInfoBox(from:string,to:string,resolve:(data:any) => void){
    this.post('/info_box',{from_date:from,to_date:to}).then(res => {
      resolve(res.data)
    })
  }  

  static checkVideo(video:string) {
    const response = Api.getCheck(video)
    return response
  }

  static updateContactInfo(data:UpdateContactInfo) {
    const response = this.post('/update_contact_info',data)
    return response
  }

  static getContactInfo(){
    const response = this.post('/show_contact_info',{})
    return response
  }
}

export default Auth;
