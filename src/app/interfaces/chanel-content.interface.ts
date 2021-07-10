export interface IChanelContent {
    attachment: number;
    regCompanyUser: {
        companyId: number;
        companyTitle: string;
        regUser: {
            id: number;
            fullName: string;
        }
    };
    text: string;
}