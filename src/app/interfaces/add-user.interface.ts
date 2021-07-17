export interface IAddUsers {
  id?:number,
  companyId?: number,
  firstName?: string;
  lastName?: string;
  password?: string;
  mobile?: string;
  internalPhone?: string;
  email?: string;
  gender?: number;
  routType?: number;
  permissions?: number[];
  roles?: number[];
  state?: number
}