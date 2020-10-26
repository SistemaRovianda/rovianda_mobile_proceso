export interface Grinding {
  rawMaterial: string;
  process: string;
  weight: number;
  date: string;
  productId: string;
  nameProduct?: string;
  lotMeat?:string;
}


export interface GrindingItemToList{
  process:string;
  weight:number,
  date:string,
  defrostId:number,
  lotId:string
}

export interface GrindingOfProcess{
  process:string,
  weight:number,
  date:string,
  productRovianda:string,
  formulation:string
}