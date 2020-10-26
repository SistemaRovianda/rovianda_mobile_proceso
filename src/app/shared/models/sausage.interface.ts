import { ProductCatalog } from "./product-catalog.interface";

export interface Sausage {
  sausagedId?: number;
  productId: number;
  temperature: string;
  date: string;
  time: Time;
  product?: ProductCatalog;
}

export interface Time {
  hour?: string;
  weight?: number;
  hour1: string;
  weightInitial: number;
  hour2: string;
  weightMedium: number;
  hour3: string;
  weightFinal: number;
}

export interface SausageItemToList{
  sausageId?:number;
  temperature:string;
  date: string;
  time:
  {
      hour1:string;
      weightInitial:string;
      hour2?:string;
      weightMedium?:string;
      hour3?:string;
      weightFinal?:string;
  },
  defrostId:number;
  lotId:string;
  productRovianda?:string;
}
