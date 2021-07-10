export interface IChanelList {
    id: number;
    title: string;
    description: string;
    memberCount: number;
    regCompanyUser: {
        companyId: number;
        companyTitle: string;
        regUser: {
            id: number;
            fullName: string
        }
    };
    roleType: {
        id: number;
        title: string;
    };
}