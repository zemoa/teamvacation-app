import {Day} from "./day";
import {createSelector} from "@ngrx/store";
export interface AppState {
  calendarState: CalendarState;
}
export interface CalendarState {
  vacations: Day[];
  modifiedDays: Day[];
}
export const getCalendarState = (state: AppState) => state.calendarState;
export const getVacationForMonth = createSelector(
  getCalendarState,
  (state: CalendarState, props) => {
      return state.vacations.filter(value => value.date.getMonth() === props.month && value.date.getFullYear() === props.year);
  }
)
