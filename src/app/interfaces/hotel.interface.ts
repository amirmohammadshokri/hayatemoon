export interface IHotel {
    id?: number;
    title?: string;
    state?: { id?: number, title?: string };
    regUser?: { id?: number, fullName?: string };
    createdDate?: string;
}
