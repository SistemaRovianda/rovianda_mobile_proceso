export interface Reprocessing {
  date: string;
  productId: number;
  lotId: number;
  weight: number;
  allergen: string;
  area: string;
  reprocessingId?: number;
  loteProcess?: string;
  loteReprocessing: string;
  allergens: string;
}
