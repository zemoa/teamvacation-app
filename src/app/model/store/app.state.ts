import {CalendarState} from "./calendar.store";
import {UserState} from "./user.store";
import {LoginState} from "./login.store";

export interface AppState {
  calendarState: CalendarState;
  userState: UserState;
  loginState: LoginState
}
