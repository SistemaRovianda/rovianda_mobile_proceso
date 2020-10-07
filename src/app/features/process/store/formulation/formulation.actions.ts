import { createAction, props } from '@ngrx/store';
import {  FormulationDetails } from 'src/app/shared/models/formulations.interface';

export const getFormulationDetails = createAction("[FORMULATION], getting formulation by id",props<{formulationId:number}>());

export const setFormulationDetails = createAction("[FORMULATION], setting formulation details",props<{formulation:FormulationDetails}>());

