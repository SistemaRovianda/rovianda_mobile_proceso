export interface Conditioning {
  rawMaterial: string;
  bone: boolean;
  clean: boolean;
  healthing: boolean;
  weight: number;
  temperature: string;
  product?: Product;
  productId?: number;
  date: string;
  lotMeat: string;
}

export interface Product {
  description: string;
  id: number;
}
