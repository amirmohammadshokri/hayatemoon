export interface IPromotion{
    id?:number;
    title?:string;
    price?:number;
    state?: { id?: number, title?: string };
    description?:string;
}