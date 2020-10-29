export interface Conditioning {
  rawMaterial: string;
  bone: boolean;
  clean: boolean;
  healthing: boolean;
  weight: number;
  temperature: string;
  productId?: number;
  date: string;
  lotMeat: string;
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
  rawMaterial:string,
  temperature:string,
  weight:number
}
