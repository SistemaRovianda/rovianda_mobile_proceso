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

export interface ConditioningOfProcess{
  bone:boolean,
  clean:boolean,
  conditioningId:number,
  date:string,
  formulation:{
    id:number,
    lotDay:string
  },
  healthing:boolean,
  lotId:string,
  product:Product,
  rawMaterial:string,
  temperature:string,
  weight:number
}
