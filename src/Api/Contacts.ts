/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contact, Tag } from "../Types";
import Api from "./Api";

interface TagApi {
    title:string,
    color:string,
}
interface addContactData {
    full_name: string,
    email: string,
    phone: string,
    location?: any,
    company?: string,
    job_title?: string,
    note?: string,
    user_id?:string,
    tag?: Array<string>,
    address?:string,
    adding_method?: string
  }

class Contacts extends Api {
    static addTag(tag:TagApi) {
      const response = this.post('/add_tag',tag)
      return response
    }

    static showTags(resolve:(tags:Array<any>) => void){
        this.post('/show_tags',{}).then((res) => {
            resolve(res.data)
        })
    }

    static updateTag(tag:Tag,contacts:Array<Contact>) {
      const response = this.post('/update_tag',{
          title: tag.name,
          color: tag.color,
          contacts: contacts.map((el) =>el.id),
          state: true,
          created_tag_id:tag.id      
      })
      return response
    }
    static updateContact(contact:Contact){
      const response =this.post('/update_contact',
      {
        full_name: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        location: contact.location,
        company: contact.company,
        job_title: contact.job,
        note: contact.note,
        tags:contact.tags.map((el) => el.id),
        profile_pic: contact.photo,
        state: true,
        created_contact_id: contact.id
      })
      return response      
    }

    static deleteTag(tag:Tag){
      const response =this.post('/update_tag',{
        state:false,
        created_tag_id:tag.id,
      })
      return response
    }    

    static addContact(data: addContactData) {
      const response = this.post('/add_contact', data);
      return response
    }

    static showContactList(submit:(res:any) => void) {
      this.post('/show_contact_list',{},{noPending:true}).then((res) => {
          submit(res.data)
      })
    } 

    static deleteContact(id:string){
      const response =this.post('/update_contact',{state:false,created_contact_id:id})
      return response
    }
}

export default Contacts