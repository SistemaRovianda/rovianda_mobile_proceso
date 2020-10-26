import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.state.interface'

const store =(state:AppState)=>state.section;
export const SELECT_CURRENT_SECTION=createSelector(
    store,
    (state)=>state.currentSection
);