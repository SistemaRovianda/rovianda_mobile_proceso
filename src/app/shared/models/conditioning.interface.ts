export interface Conditioning {
  rawMaterial: string;
  bone: boolean;
  clean: boolean;
  healthing: boolean;
  weight: number;
  temperature: string;
  product: Product;
  date: string;
}

export interface Product {
  description: string;
  id: number;
}
