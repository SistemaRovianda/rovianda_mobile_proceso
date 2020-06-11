export interface NewProcess {
  productId: number;
  lote: LotProduct;
  weight: number;
  temperature: string;
  hourEntrance: string;
  dateIni: string;
}

export interface LotProduct {
  loteId: string;
  outputId: number;
}
