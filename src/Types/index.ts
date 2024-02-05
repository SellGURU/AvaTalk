interface PhoneCountry {
  codeName : string;
  codePhone: string
}

interface Tag {
  id:string;
  name:string;
  color:string;
  contacts:number;
}

interface Contact {
  id: string;
  firstName:string
  lastName: string;
  email: string;
  photo: string;
  tags:Array<Tag>
  isExchange: boolean;
  phone: string;
  location: string;
  company: string;
  meetDate: string;
  addDate: string;
  job: string;
}

interface chat {
  from:'Ai'|'user',
  text:string,
  currentconverationid:string,
  instanceid:string,
  audio_file:string
}

type MenuType = 'profile'| 'contacts' | 'chats' | 'status' | 'settings';


export type {
    PhoneCountry,
    MenuType,
    Tag,
    Contact,
    chat
}