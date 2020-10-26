import { createAction, props } from '@ngrx/store';

export const setSection=createAction("[SECTION] setting section",props<{section:string}>());