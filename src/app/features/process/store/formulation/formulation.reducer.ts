import { createReducer, on } from '@ngrx/store';
import { FormulationDetails } from "src/app/shared/models/formulations.interface";
import { setFormulationDetails } from './formulation.actions';

const initValue:FormulationDetails={
    date:null,
    defrosts:[],
    lotDay:null,
    id:null,
    make:null,
    productRovianda:null,
    status:null,
    temp:null,
    verifit:null,
    waterTemp:null
}

export const formulationReducer = createReducer<FormulationDetails>(
    initValue,
    on(setFormulationDetails,(state,{formulation})=>({...formulation}))
);