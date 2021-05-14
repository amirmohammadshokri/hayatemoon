export interface IAddResidence{
    title?: string;
    locationId?: number;
    address?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
    mediaIds?: number[];
    mainMediaId?: number;
    facilitiesKindIds?: number[];
    places?: {
      id?: number;
      title?: string;
      minute?: number;
      vehicleId?: number;
    }[];
    description?: string;
    fromEntranceHour?: string;
    toEntranceHour?: string;
    leavingHour?: string;
    rules?: string[];
    isAdmin?: boolean;
  
}
