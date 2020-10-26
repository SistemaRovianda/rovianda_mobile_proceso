export interface FormulationPending{
    formulationId: number,
    productName: string,
    lotDay: string,
    createAt: string
}

export interface FormulationDetails{
    id:number,
    temp:string,
    date:string,
    waterTemp:string,
    status:string,
    lotDay:string,
    productRovianda:FormulationProductRovianda,
    verifit:FormulationUsers,
    make:FormulationUsers,
    defrosts: FormulationDefrost[]
}

export interface FormulationDefrost{
    defrostFormulationId:number,
    lotMeat:string,
    defrost:any
}

export interface FormulationUsers{
    id:string,
    saKey:number,
    name:string,
    email:string,
    job:string,
    roles: {
        roleId:number,
        description:string
    }
}

export interface FormulationProductRovianda{
    id:number,
    name:string,
    code:string,
    status:boolean,
    imgS3:string
}
