export interface IResidence{
    id?: number;
    title?: string;
    regUser?: { id?: number, fullName?: string };
    state?: { id?: number, title?: string };
    createdDate?: string;
}