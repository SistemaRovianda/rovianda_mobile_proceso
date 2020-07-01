import { ProductCatalog } from "./product-catalog.interface";

export interface Tenderized {
  productId: number;
  temperature: string;
  weight: number;
  weightSalmuera: number;
  percentage: number;
  date: string;
  weight_salmuera?: number;
  product?: ProductCatalog;
}
