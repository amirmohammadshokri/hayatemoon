export interface IAddHotel {
  typeId?: number;
  title?: string;
  rate?: number;
  locationId?: number;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  hotelMediaIds?: number[];
  mainMediaId?: number;
  facilitiesKindIds?: number[];
  places?: {
    id?: number;
    title?: string;
    minute?: number;
    vehicleId?: number;
  }[];
  description?: string;
  isAdmin?: boolean;
}
