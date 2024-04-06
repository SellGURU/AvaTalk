/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

interface TagApi {
    title:string,
    color:string,
    contact:Array<any>
}
interface addContactData {
    full_name: string,
    email: string,
    phone: string,
    location?: {},
    company?: string,
    job_title?: string,
    note?: string,
    tag?: [
      string
    ],
    adding_method?: string
  }

class Contacts extends Api {
    static addTag(tag:TagApi) {
        this.post('/add_tag',tag).then(res =>console.log(res))
    }

    static showTags(resolve:(tags:Array<any>) => void){
        this.post('/show_tags',{}).then((res) => {
            resolve(res.data)
        })
    }

    static addContact(data: addContactData) {
      this.post('/add_contact', data)
        .then(res => {
          console.log(res);
        });
    }

    static showContactList(submit:(res:any) => void) {
      this.post('/show_contact_list',{}).then((res) => {
          submit(res.data)
      })
    } 
}

export default Contacts