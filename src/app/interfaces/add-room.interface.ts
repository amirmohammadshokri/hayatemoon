export interface IAddRoom {
  hotelId?: any;
  kindId?: any;
  adult?: number;
  child?: number;
  breakFast: boolean;
  lunch: boolean;
  dinner: boolean;
  extraService: boolean;
  facilitiesKindIds: any[];
  description?: string;
}
