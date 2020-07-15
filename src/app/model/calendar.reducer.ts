import {Day} from "./day";
import {Action, createReducer, on} from "@ngrx/store";
import * as CalendarActions from './actions/calendar.actions';
import * as _ from 'lodash';
import {VacationDay, VacationType} from "./dto";
import {CalendarState} from "./calendar.store";


export const initialState: CalendarState = {
  vacations: [{
    date: new Date(2020, 6, 14),
    am: {
      type: VacationType.RTT,
      modified: false
    },
    pm: {
      type: VacationType.UNKNOWN,
      modified: false
    },
  }],
  modifiedDays: [],
}

const calendarReducer = createReducer(
  initialState,

  on(CalendarActions.addVacation, (state, {aDate, aType, partOfDay}) => {
    return addOrRemoveDay(state, aDate, aType, partOfDay, true);
  }),

  on(CalendarActions.removeVacation, (state, {aDate, aType, partOfDay}) => {

    return addOrRemoveDay(state, aDate, aType, partOfDay, false);
  }),

  on(CalendarActions.reloadVacation, state => {
    return initialState; //TODO
  }),

  on(CalendarActions.saveVacation, state => {
    return state
  }),
)

export function reducer(state: CalendarState | undefined, action: Action) {
  return calendarReducer(state, action);
}

function addOrRemoveDay(state: CalendarState, aDate: Date, aType: VacationType, partOfDay: VacationDay, added: boolean): CalendarState {
  let modifiedDays = [...state.modifiedDays];
  let updatedDay: Day;
  let foundDay = _.first(_.remove(modifiedDays, {date: aDate}));
  if(!foundDay) {
    foundDay = state.vacations.find(value => value.date === aDate);
  }
  if(!foundDay) {
    updatedDay = new Day();
    updatedDay.date = aDate;
  } else {
    updatedDay = {...foundDay};
  }

  if(partOfDay == VacationDay.ALL || partOfDay == VacationDay.MORNING) {
    let modified = updatedDay.am.modified;
    if(updatedDay.am.type !== aType) {
      modified = !modified;
    }
    updatedDay.am = {
      type : aType,
      modified : modified
    };
  }
  if(partOfDay == VacationDay.ALL || partOfDay == VacationDay.AFTERNOON) {
    let modified = updatedDay.pm.modified;
    if(updatedDay.pm.type !== aType) {
      modified = !modified;
    }
    updatedDay.pm = {
      type : aType,
      modified : modified
    }
  }
  let vacations = [...state.vacations];
  _.remove(vacations, value => value.date === updatedDay.date);
  if(updatedDay.am.modified || updatedDay.pm.modified) {
    console.log("Add modification");
    modifiedDays = modifiedDays.concat(updatedDay);
    vacations = vacations.concat(updatedDay);
  } else {
    console.log("Remove modification");
  }

  return ({
    ...state,
    vacations: vacations,
    modifiedDays: modifiedDays
  });
}
