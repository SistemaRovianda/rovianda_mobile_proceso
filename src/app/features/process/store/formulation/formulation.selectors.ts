import { createSelector } from '@ngrx/store';
import { AppState } from "src/app/shared/models/store.state.interface";

export const FORMULATION_STATE = (state: AppState) => state.formulationDetails;


export const GET_FORMULATION_DETAILS  = createSelector(FORMULATION_STATE,(state)=>({...state}));
