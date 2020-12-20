import {Day} from "../day";
import {createSelector} from "@ngrx/store";
import {AppState} from "./app.state";

export interface CalendarState {
  vacations: Day[];
  modifiedDays: Day[];
  saving: boolean;
}
export const getCalendarState = (state: AppState) => state.calendarState;
export const getVacationForMonth = createSelector(
  getCalendarState,
  (state: CalendarState, props) => {
      return state.vacations.filter(value => value.date.getMonth() === props.month && value.date.getFullYear() === props.year);
  }
)

export const getModifiedDays = createSelector(
  getCalendarState,
  (state: CalendarState) => state.modifiedDays
)

export const hasModifiedDays = createSelector(
  getCalendarState,
  (state: CalendarState) => state.modifiedDays && state.modifiedDays.length >= 1
)
