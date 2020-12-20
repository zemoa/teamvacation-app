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
export const loadVacation = createAction(
  '[Calendar Action] Load',
  props<{reload:boolean, userId: number, month: Date}>()
  );
export const vacationLoaded = createAction(
  '[Calendar Action] loaded',
    props<{reload: boolean, vacations: Day[]}>()
  );
export const saveVacation = createAction('[Calendar Action] Save');
export const vacationSaved = createAction(
  '[Calendar Action] Saved',
  props<{vacations: Day[]}>()
);
