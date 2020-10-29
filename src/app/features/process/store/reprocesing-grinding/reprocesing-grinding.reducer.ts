
import { createReducer, on } from '@ngrx/store';
import { ReprocesingStore } from "src/app/shared/models/reprocessing.interface";
import { setLotsOfReprocesing, setLotsReprocesingOfProcess, vinculateReprocesingToProcess, vinculateReprocesingToProcessError, vinculateReprocesingToProcessSuccess } from './reprocesing-grinding.actions';

const initValue:ReprocesingStore ={
    reprocesingAvailable:[],
    reprocesingOfProcess:[],
    isLoading:false,
    error:null
};

export const reprocesingGrindingReducer = createReducer<ReprocesingStore>(
    initValue,
    on(setLotsOfReprocesing,(state,{lotsReprocesing})=>({...state,reprocesingAvailable:lotsReprocesing})),
    on(setLotsReprocesingOfProcess,(state,{reprocesings})=>({...state,reprocesingOfProcess:reprocesings})),
    on(vinculateReprocesingToProcessSuccess,(state)=>({...state,isLoading:false})),
    on(vinculateReprocesingToProcessError,(state,{error})=>({...state,isLoading:false,error})),
    on(vinculateReprocesingToProcess,(state)=>({...state,isLoading:true})));