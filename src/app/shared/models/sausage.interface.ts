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
