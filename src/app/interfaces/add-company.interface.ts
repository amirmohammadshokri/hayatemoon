export interface IAddCompany {
  title?: string;
  type?: number;
  ceoFirstName?: string;
  ceoLastName?: string;
  ceoNationalCode?: string;
  ceoBirthDate?: string;
  companyNationalCode?: string;
  economyCode?: string;
  address?: string;
  locationId?: number;
  state?: number;
  contacts?: IUser[];
  certificatesMediaIds?: number[];
}

interface IUser {
  title?: string;
  value?: string;
}