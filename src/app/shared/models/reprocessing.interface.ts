export interface ReprocessingOfProcess {
  allergen: string,
  date: string,
  lotId: string,
  productName: string,
  weight: number,
  active: boolean,
  defrostId:number
  reprocesingId?:number;
  used:boolean;
  weightUsed:string;
  process:string;
  dateUsed:string;
}


export interface ReprocesingToSet{
  reprocesingId:number;
  lotId:string;
  weight:number;
  date:string;
  rawMaterial:string
}

export interface ReprocesingStore{
  reprocesingAvailable:ReprocessingOfProcess[],
  reprocesingOfProcess:ReprocessingOfProcess[],
  isLoading:boolean,
  error:any
}

export interface reprocesingOfGrinding{
    reprocesingId:number,
    process:string,
    weight:string;
    date:string;
}