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

  on(CalendarActions.add, (state, {aDate, aType, partOfDay}) => {
    return addOrRemoveDay(state, aDate, aType, partOfDay, true);
  }),

  on(CalendarActions.remove, (state, {aDate, aType, partOfDay}) => {

    return addOrRemoveDay(state, aDate, aType, partOfDay, false);
  }),

  on(CalendarActions.reload, state => {
    return initialState; //TODO
  }),

  on(CalendarActions.save, state => {
    return state
  }),
)

export function reducer(state: CalendarState | undefined, action: Action) {
  return calendarReducer(state, action);
}

function addOrRemoveDay(state: CalendarState, aDate: Date, aType: VacationType, partOfDay: VacationDay, added: boolean): CalendarState {
  let modifiedDays = state.modifiedDays;
  let updatedDay = _.first(_.remove(modifiedDays, {date: aDate}));
  if(!updatedDay) {
    updatedDay = state.vacations.find(value => value.date === aDate);
  }
  if(!updatedDay) {
    updatedDay = new Day();
  }

  if(partOfDay == VacationDay.ALL || partOfDay == VacationDay.MORNING) {
    if(updatedDay.am.type !== aType) {
      updatedDay.am.modified = !updatedDay.am.modified;
    }
    updatedDay.am.type = aType;
  }
  if(partOfDay == VacationDay.ALL || partOfDay == VacationDay.AFTERNOON) {
    if(updatedDay.pm.type !== aType) {
      updatedDay.pm.modified = !updatedDay.pm.modified;
    }
    updatedDay.pm.type = aType;
  }
  let vacations = state.vacations;
  _.remove(state.vacations, {date: updatedDay.date});
  if(updatedDay.am.modified || updatedDay.pm.modified) {
    console.log("Add modification");
    modifiedDays.push(updatedDay);
    vacations.push(updatedDay);
  } else {
    console.log("Remove modification");
  }

  return ({
    ...state,
    vacations: vacations,
    modifiedDays: modifiedDays
  });
}
