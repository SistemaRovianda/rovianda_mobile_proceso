import { createAction, props } from '@ngrx/store';
import { ReprocesingToSet, ReprocessingOfProcess } from 'src/app/shared/models/reprocessing.interface';
import { ReprocessingToProcess } from 'src/app/shared/models/reprocessingToProcess.interface';

export const loadLotsOfReprocesing = createAction(
    "[GRINDING REPROCESING] getting lots of reprocesing"
);

export const setLotsOfReprocesing = createAction(
    "[GRINDING REPROCESING] setting lots of reprocesing",
    props<{lotsReprocesing:ReprocessingOfProcess[]}>()
);

export const getLotsReprocesingOfProcess = createAction(
    "[GRINDING REPROCESING] getting lots of reprocesing of process"
);
export const setLotsReprocesingOfProcess = createAction(
    "[GRINDING REPROCESING] setting lots of reprocesing of process",
    props<{reprocesings:ReprocessingOfProcess[]}>()
);


export const vinculateReprocesingToProcess = createAction(
    "[GRINDING REPROCESING] vinculating lots of reprocesing to process",
    props<{reprocesings:number[]}>()
);

export const vinculateReprocesingToProcessSuccess = createAction(
    "[GRINDING REPROCESING] vinculationSuccess"
);

export const vinculateReprocesingToProcessError = createAction(
    "[GRINDING REPROCESING] vinculationError",
    props<{error:any}>()
);