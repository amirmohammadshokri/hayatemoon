export interface IAddTour {
  isForeign?: boolean;
  isInstallments?: boolean;
  fromLocationId?: number;
  toLocationId?: number;
  title?: string;
  tourType?: number;
  vehicles?: IVehicle[];
  dayDuration?: number;
  nightDuration?: number;
  startDate?: string;
  endDate?: string;
  tourCategories?: number[];
  tourMediaIds: number[];
  mainImageId?: number;
  price?: IPrice;
  hotelId?: number;
  hotelRooms?: number[];
  description?: string;
}
export interface IPrice {
  price?: number;
  disCountPrice?: number;
  currencyPrice?: number;
  currencyPriceType?: number;
  netPrice?: number;
}
export interface IVehicle {
  type: number;
  vehicleId: number;
}

