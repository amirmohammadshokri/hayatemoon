export interface IAdvertising{
    id?: number;
    regCompanyUser?:IRegCompanyUser[];
    startDate?: string;
    endDate?: string;
    saveDate?: string;
  }
  interface IRegCompanyUser{
    companyId?:number;
    companyTitle?:string;
    regUser?: {id: number,fullName?: string};
  }
