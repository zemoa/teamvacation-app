import {CalendarState} from "./calendar.store";
import {UserState} from "./user.store";

export interface AppState {
  calendarState: CalendarState;
  userState: UserState;
}
