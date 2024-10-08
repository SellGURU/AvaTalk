/* eslint-disable @typescript-eslint/no-explicit-any */
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

type BusinessCard = {
    title:string,
    image:string,
    colors:Array<string>,
    price:string,
    id:string,
    urls:Array<any>,
    description:string,
    product_id:string,
    images:Array<any>
}

export type { PhoneCountry, MenuType, Tag, BusinessCard ,Contact, chat ,SharingModType,Location};

