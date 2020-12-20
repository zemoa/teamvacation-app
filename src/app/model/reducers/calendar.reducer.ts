import {Day} from "../day";
import {Action, createReducer, on} from "@ngrx/store";
import * as CalendarActions from '../actions/calendar.actions';
import * as _ from 'lodash';
import {VacationDay, VacationType} from "../dto";
import {CalendarState} from "../store/calendar.store";
import Utils from "../../shared/utils/Utils";


export const initialState: CalendarState = {
  vacations: [],
  modifiedDays: [],
  saving: false,
}

const calendarReducer = createReducer(
  initialState,

  on(CalendarActions.addVacation, (state, {aDate, aType, partOfDay}) => {
    return addOrRemoveDay(state, aDate, aType, partOfDay, true);
  }),

  on(CalendarActions.removeVacation, (state, {aDate, aType, partOfDay}) => {

    return addOrRemoveDay(state, aDate, aType, partOfDay, false);
  }),

  on(CalendarActions.vacationLoaded, (state, {reload, vacations}) => {
    let vacationDays: Day[];
    if(reload) {
      vacationDays = vacations;
    } else {
      if(state.vacations) {
        vacationDays = [...state.vacations];
        vacations.forEach(dayToAdd => {
          if(vacationDays.some(value => value.date.getTime() === dayToAdd.date.getTime())) {
            vacationDays = Utils.insertIntoList(dayToAdd, vacationDays, day => day.date.getTime() === dayToAdd.date.getTime());
          } else {
            vacationDays.push(dayToAdd);
          }
        });
      } else {
        vacationDays = vacations;
      }
    }
    return {
      ...state,
      vacations: vacationDays
    }
  }),

  on(CalendarActions.saveVacation, state => {
    return {
      ...state,
      saving: true
    }
  }),

  on(CalendarActions.vacationSaved, (state, {vacations}) => {
    let vacationList = [...state.vacations];
    state.modifiedDays.forEach(modifiedDay => {
      //First remove
      if(!modifiedDay.am.type || modifiedDay.am.type === VacationType.UNKNOWN ||
        !modifiedDay.pm.type || modifiedDay.pm.type === VacationType.UNKNOWN) {
        let vacationToModify = vacationList.find(vacation => vacation.date.getTime() === modifiedDay.date.getTime());
        if(vacationToModify) {
          if(!modifiedDay.am.type || modifiedDay.am.type === VacationType.UNKNOWN) {
            vacationToModify = {
              ...vacationToModify,
              am: {
                type: VacationType.UNKNOWN,
                id: -1,
                modified: false,
                validated: false
              }
            }
          }
          if(!modifiedDay.pm.type || modifiedDay.pm.type === VacationType.UNKNOWN) {
            vacationToModify = {
              ...vacationToModify,
              pm: {
                type: VacationType.UNKNOWN,
                id: -1,
                modified: false,
                validated: false
              }
            }
          }
        }
      }
    });
    vacations.forEach(dayToAdd => {
      if(vacationList.some(value => value.date.getTime() === dayToAdd.date.getTime())) {
        vacationList = Utils.insertIntoList(dayToAdd, vacationList, day => day.date.getTime() === dayToAdd.date.getTime());
      } else {
        vacationList.push(dayToAdd);
      }
    });
    return {
      ...state,
      modifiedDays: [],
      vacations: vacationList,
      saving: false
    }
  })
)

export function reducer(state: CalendarState | undefined, action: Action) {
  return calendarReducer(state, action);
}

function addOrRemoveDay(state: CalendarState, aDate: Date, aType: VacationType, partOfDay: VacationDay, added: boolean): CalendarState {
  let modifiedDays = [...state.modifiedDays];
  let updatedDay: Day;
  let foundDay = _.first(_.remove(modifiedDays, {date: aDate}));
  if(!foundDay) {
    foundDay = state.vacations.find(value => value.date.getTime() === aDate.getTime());
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
      ...updatedDay.am,
      type : aType,
      modified : modified,
      validated: false
    };
  }
  if(partOfDay == VacationDay.ALL || partOfDay == VacationDay.AFTERNOON) {
    let modified = updatedDay.pm.modified;
    if(updatedDay.pm.type !== aType) {
      modified = !modified;
    }
    updatedDay.pm = {
      ...updatedDay.pm,
      type : aType,
      modified : modified,
      validated: false
    }
  }
  let vacations = [...state.vacations];
  _.remove(vacations, value => value.date === updatedDay.date);
  if(updatedDay.am.modified || updatedDay.pm.modified) {
    console.log("Add modification");
    modifiedDays = modifiedDays.concat(updatedDay);
    if(added) {
      vacations = vacations.concat(updatedDay);
    }
  } else {
    console.log("Remove modification");
  }

  return ({
    ...state,
    vacations: vacations,
    modifiedDays: modifiedDays
  });
}
