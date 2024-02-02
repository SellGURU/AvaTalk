interface PhoneCountry {
  codeName : string;
  codePhone: string
}
type MenuType = 'profile'| 'contacts' | 'chats' | 'status' | 'settings';

export type {
    PhoneCountry,
    MenuType
}