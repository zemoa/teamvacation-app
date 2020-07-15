import {createAction, props} from "@ngrx/store";
import {Day} from "../day";
import {VacationDay, VacationType} from "../dto";

export const addVacation = createAction(
  '[Calendar Action] Add',
  props<{aDate: Date, aType: VacationType, partOfDay: VacationDay}>()
);
export const removeVacation = createAction(
  '[Calendar Action] Remove',
  props<{aDate: Date, aType: VacationType, partOfDay: VacationDay}>());
export const reloadVacation = createAction('[Calendar Action] Reload');
export const saveVacation = createAction('[Calendar Action] Save');

