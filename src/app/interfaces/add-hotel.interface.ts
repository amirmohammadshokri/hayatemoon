interface IRoom {
  hotelRoomKindId: number;
  hotelRoomMediaId: number[];
  description: string;
}

export interface IAddHotel {
  hotelId: number;
  title: string;
  description: string;
  locationId: number;
  hotelTypeId: number;
  mainImageId: number;
  promotionType: number;
  promotionEndDate: string;
  hotelMediaIds: number[];
  hotelFacilitiesKindIds: number[];
  hotelRoom: IRoom[];
}
