export interface IAddTour {
  title?: string;
  hotelId?: number;
  description?: string;
  tourType?: number;
  isForeign?: boolean;
  fromLocationId?: number;
  toLocationId?: number;
  startDate?: string;
  endDate?: string;
  dayDuration?: number;
  nightDuration?: number;
  mainImageId?: number;
  tourMediaIds: number[];
  isInstallments?: boolean;
  promotionType?: number;
  promotionEndDate?: string;
  price?: IPrice[];
  tourCategories?: number[];
  tourVehicle?: {
    airPlaneTourVehicles?: IAirPlaneTourVehicles[];
    trainTourVehicles?: any[];
    busTourVehicles?: any;
  };
}

export interface IPrice {
    price?:number;
    currencyPrice?:number;
    currencyPriceType?:number;
    netPrice?:number;
    disCountPrice?:number;
}

export interface ITypeTour{
    id?:number;
    title?:string;
}
 

export interface IAirPlaneTourVehicles {
  airLineId?: number;
  goneTime?: string;
  backTime?: string;
  flightClass?: string;
  description?: string;
}
 
