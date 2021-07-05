// export interface ICompany{
//     companyId?: number;
//     title?: string;
//     regUser?: {id: number,fullName?: string};
//     ceoFirstName?: string;
//     ceoLastName?: string;
//     saveDate?: string;
//   }

  export interface ICompany{
    companyId?: number;
    title?: string;
    regCompanyUser?:IRegCompanyUser[];
    ceoFirstName?: string;
    ceoLastName?: string;
    saveDate?: string;
  }
  interface IRegCompanyUser{
    companyId?:number;
    companyTitle?:string;
    regUser?: {id: number,fullName?: string};
  }

