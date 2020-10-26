import { createReducer, on } from '@ngrx/store';
import { setSection } from './section.actions';

export interface sectionInterface{
    currentSection:string
}
const initValue:sectionInterface={
    currentSection:""
};

export const sectionReducer = createReducer<sectionInterface>(
    initValue,
    on(setSection,(state,{section})=>({currentSection:section}))
);
