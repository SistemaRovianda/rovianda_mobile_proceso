import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.state.interface';

const REPROCESINGS = (appState:AppState)=>appState.reprocesingGrinding;
export const SELECT_ALL_REPROCESINGS=createSelector(
    REPROCESINGS,
    (state)=>state.reprocesingAvailable
);

export const SELECT_REPROCESINGS_OF_PROCESS = createSelector(
    REPROCESINGS,
    (state)=>state.reprocesingOfProcess
);

export const SELECT_REPROCESINGS_OF_PROCESS_LOADING = createSelector(
    REPROCESINGS,
    (state)=>state.isLoading
);

export const SELECT_REPROCESINGS_OF_PROCESS_ERROR = createSelector(
    REPROCESINGS,
    (state)=>state.error
);
