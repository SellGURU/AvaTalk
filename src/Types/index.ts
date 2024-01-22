interface PhoneCountry {
  codeName : string;
  codePhone: string
}
type MenuType = 'profile'| 'contacts' | 'status' | 'settings';

export type {
    PhoneCountry,
    MenuType
}