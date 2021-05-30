export interface IAddResidence {
  id?: number;
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
    vehicleTitle?: string;
  }[];
  description?: string;
  fromEntranceHour?: string;
  toEntranceHour?: string;
  leavingHour?: string;
  rules?: any[];
  prices?: IPrice;
  isAdmin?: boolean;
}

interface IPrice {
  price?: number;
  thursdayPercent?: number;
  fridayPercent?: number;
  holiday?: number;
  beforeHoliday?: number;
  priceRules?: {
    price?: number;
    from?: any;
    to?: any
  }[];
}
