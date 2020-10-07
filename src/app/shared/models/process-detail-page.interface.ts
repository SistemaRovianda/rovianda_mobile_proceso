import { ProductCatalog } from "./product-catalog.interface";
import { ProductsRovianda } from "./produts-rovianda.interface";
import { ProcessLotMeat } from "./procces-lot-meat.interface";
import { MenuButton } from './menu-button.interface';


export interface ProcessDetail {
  products: ProductCatalog[];
  loading: boolean;
  error: string;
  formulations: ProductsRovianda[];
  productsRovianda: ProductsRovianda[];
  lotsMeatProcess: ProcessLotMeat[];
  section: MenuButton;
}
