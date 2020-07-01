import { ProductCatalog } from "./product-catalog.interface";

export interface ProcessDetail {
  products: ProductCatalog[];
  loading: boolean;
  error: string;
}
