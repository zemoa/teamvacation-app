import {Day} from "../day";
import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {AddVacation, LoadVacation, RemoveVacation, SaveVacation} from "../actions/calendar.actions";
import {AskResultDto, VacationDay, VacationDto, VacationType} from "../dto";
import {VacationService} from "../../core/services/ws/vacation.service";
import Utils from "../../shared/utils/Utils";
import {manageWsErrors} from "../../shared/helpers/utils.helper";
import {EnumErrorFunc} from "../TVError";
import {LoginState, LoginStateModel} from "./login.state";

export interface CalendarStateModel {
  vacations: Day[];
  modifiedDays: Day[];
  saving: boolean;
}
export const initialState: CalendarStateModel = {
  vacations: [],
  modifiedDays: [],
  saving: false,
};

@State<CalendarStateModel>({
  name: "calendarState",
  defaults: initialState
})
@Injectable()
export class CalendarState {
  constructor(private vacationService: VacationService, private store: Store) {}

  @Action(AddVacation)
  addVacation(ctx: StateContext<CalendarStateModel>, action: AddVacation) {
    this.addOrRemoveDay(ctx, action.aDate, action.aType, action.partOfDay, true);
  }

  @Action(RemoveVacation)
  removeVacation(ctx: StateContext<CalendarStateModel>, action: RemoveVacation) {
    this.addOrRemoveDay(ctx, action.aDate, action.aType, action.partOfDay, false);
  }

  @Action(LoadVacation)
  async loadVacation(ctx: StateContext<CalendarStateModel>, action: LoadVacation) {
    const start = new Date(action.month.getFullYear(), action.month.getMonth(), 1);
    const end = new Date(action.month.getFullYear(), action.month.getMonth() + 1, 0);
    try {
      const vacationList = await this.vacationService.getVacationList(action.userId, start, end).toPromise();
      const dayList= new Map<string, Day>();
      vacationList.forEach(vacationDto => {
        const day = this.vacationService.convertVacationDtoToDay(vacationDto);
        if(dayList.has(vacationDto.date)) {
          if(day.am.type && day.am.type != VacationType.UNKNOWN){
            dayList.get(vacationDto.date).am = day.am;
          }
          if(day.pm.type && day.pm.type != VacationType.UNKNOWN){
            dayList.get(vacationDto.date).pm = day.pm;
          }
        } else {
          dayList.set(vacationDto.date, day);
        }
      });
      const convertedVacation = Array.from(dayList.values());
      const state = ctx.getState();
      let vacationDays: Day[];
      if(action.reload || !state.vacations) {
        vacationDays = convertedVacation;
      } else {
        vacationDays = [...state.vacations];
        convertedVacation.forEach(dayToAdd => {
          if(vacationDays.some(value => value.date.getTime() === dayToAdd.date.getTime())) {
            vacationDays = Utils.insertIntoList(dayToAdd, vacationDays, day => day.date.getTime() === dayToAdd.date.getTime());
          } else {
            vacationDays.push(dayToAdd);
          }
        });
      }
      ctx.patchState({
        vacations: vacationDays
      });
    } catch (error) {
      manageWsErrors(EnumErrorFunc.LOAD_VACATION, error, ctx);
    }
  }

  @Action(SaveVacation)
  async saveVacation(ctx: StateContext<CalendarStateModel>) {
    ctx.patchState({
      saving: true
    });
    const modifiedDays = ctx.getState().modifiedDays;
    let vacationList: VacationDto[] = [];
    modifiedDays.forEach(modifiedDay => {
      const tmpList = this.vacationService.convertDayToVacationDto(modifiedDay);
      vacationList = vacationList.concat(tmpList);
    });
    const vacationToDelete: VacationDto[] = [];
    const vacationToAddModify: VacationDto[] = [];
    vacationList.forEach(vacationDto => {
      if(!vacationDto.type || vacationDto.type == VacationType.UNKNOWN) {
        vacationToDelete.push(vacationDto);
      } else {
        vacationToAddModify.push(vacationDto);
      }
    });
    const loginStateModel = this.store.selectSnapshot<LoginStateModel>(LoginState);
    let askResultDto: AskResultDto;
    try {
      //first delete vacations if needed
      if (vacationToDelete.length > 0) {
        await this.vacationService.delete(loginStateModel.connectedUser.id, vacationToDelete).toPromise();
      }
      //then add vacation if needed
      if (vacationToAddModify.length > 0) {
        askResultDto = await this.vacationService.ask(loginStateModel.connectedUser.id, vacationToAddModify).toPromise();
      }
    } catch (error) {
      manageWsErrors(EnumErrorFunc.SAVE_VACATION, error, ctx);
    }
    if(askResultDto) {
      console.log(askResultDto);
      let vacationList = [...ctx.getState().vacations];
      askResultDto.vacationList.forEach(vacation => {
        const convertedDay = this.vacationService.convertVacationDtoToDay(vacation);
        const foundDay = modifiedDays.find(modifiedDay => modifiedDay.date.getTime() === convertedDay.date.getTime());
        if(foundDay) {
          foundDay.am.id = convertedDay.am.id;
          foundDay.pm.id = convertedDay.pm.id;
        }
      });
      modifiedDays.forEach(modifiedDay => {
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
              };
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
              };
            }
          }
        }
      });
      modifiedDays.forEach(dayToAdd => {
        if(vacationList.some(value => value.date.getTime() === dayToAdd.date.getTime())) {
          vacationList = Utils.insertIntoList(dayToAdd, vacationList, day => day.date.getTime() === dayToAdd.date.getTime());
        } else {
          vacationList.push(dayToAdd);
        }
      });
      ctx.patchState({
        saving: false,
        modifiedDays: [],
        vacations: vacationList
      });
    } else {
      //TODO maybe do it better, especially if there is an error
      console.log(`no add vacations`);
      ctx.patchState({
        saving: false,
        modifiedDays: []
      });
    }
  }

  private addOrRemoveDay(ctx: StateContext<CalendarStateModel>, aDate: Date, aType: VacationType, partOfDay: VacationDay, added: boolean) {
    const state = ctx.getState();
    let modifiedDays = [...state.modifiedDays];
    let updatedDay: Day;
    let foundDay = Utils.removeFromListAndPop(modifiedDays, value => value.date.getTime() === aDate.getTime());
    if (!foundDay ) {
      foundDay = state.vacations.find(value => value.date.getTime() === aDate.getTime());
    }
    if (!foundDay) {
      updatedDay = new Day();
      updatedDay.date = aDate;
    } else {
      updatedDay = {...foundDay};
    }

    if (partOfDay == VacationDay.ALL || partOfDay == VacationDay.MORNING) {
      let modified = updatedDay.am.modified;
      if (updatedDay.am.type !== aType) {
        modified = !modified;
      }
      updatedDay.am = {
        ...updatedDay.am,
        type: aType,
        modified: modified,
        validated: false
      };
    }
    if (partOfDay == VacationDay.ALL || partOfDay == VacationDay.AFTERNOON) {
      let modified = updatedDay.pm.modified;
      if (updatedDay.pm.type !== aType) {
        modified = !modified;
      }
      updatedDay.pm = {
        ...updatedDay.pm,
        type: aType,
        modified: modified,
        validated: false
      };
    }
    let vacations = [...state.vacations];
    Utils.removeFromListAndPop(vacations, value => value.date === updatedDay.date);
    if (updatedDay.am.modified || updatedDay.pm.modified) {
      console.log("Add modification");
      modifiedDays = modifiedDays.concat(updatedDay);
      vacations = vacations.concat(updatedDay);
    } else {
      console.log("Remove modification");
    }

    ctx.patchState({
      vacations: vacations,
      modifiedDays: modifiedDays
    });
  }

  static getVacationForMonth(month: number, year: number) {
    return createSelector([CalendarState], (state: CalendarStateModel) => {
      return state.vacations.filter(value => value.date.getMonth() === month && value.date.getFullYear() === year);
    });
  }
  @Selector([CalendarState])
  static hasModifiedDays(state: CalendarStateModel) {
    return state.modifiedDays && state.modifiedDays.length >= 1;
  }
}
