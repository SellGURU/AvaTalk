interface PhoneCountry {
  codeName: string;
  codePhone: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
  contacts: number;
}

interface Contact {
  id: string;
  fullName: string;
  email: string;
  photo?: string;
  tags: Array<Tag>;
  isExchange?: boolean;
  phone: string;
  location?: string;
  address:string;
  mapLocation: { lat: number | undefined; lng: number | undefined };
  company: string;
  note: string;
  addDate?: string;
  job: string;
}

interface chat {
  from: "Ai" | "user";
  text: string;
  message_key:string;
  currentconverationid: string;
  instanceid: string;
  audio_file: string;
  chat_user?:string
}

type MenuType = "profile" | "contacts" | "chats" | "status" | "settings";

type SharingModType = 'Default Mode'|'Lead Mode'|'Lead Mode'

type Location = {
    lat:number,
    lng:number
}
export type { PhoneCountry, MenuType, Tag, Contact, chat ,SharingModType,Location};
