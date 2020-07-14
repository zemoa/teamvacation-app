import {createAction, props} from "@ngrx/store";
import {Day} from "../day";
import {VacationDay, VacationType} from "../dto";

export const add = createAction(
  '[Calendar Action] Add',
  props<{aDate: Date, aType: VacationType, partOfDay: VacationDay}>()
);
export const remove = createAction(
  '[Calendar Action] Remove',
  props<{aDate: Date, aType: VacationType, partOfDay: VacationDay}>());
export const reload = createAction('[Calendar Action] Reload');
export const save = createAction('[Calendar Action] Save');

