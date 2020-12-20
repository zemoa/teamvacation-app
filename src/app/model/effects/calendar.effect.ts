import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as CalendarAction from "../actions/calendar.actions";
import {catchError, concatMap, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {manageWsErrors} from "../../shared/helpers/utils.helper";
import {EnumErrorFunc} from "../TVError";
import {VacationService} from "../../core/services/ws/vacation.service";
import {Observable, of, zip} from "rxjs";
import {Day} from "../day";
import {AskResultDto, Empty, VacationDay, VacationDto, VacationType} from "../dto";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {getModifiedDays} from "../store/calendar.store";
import {getLoggedUser} from "../store/login.store";

@Injectable()
export class CalendarEffect {
  loadVacation$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarAction.loadVacation),
    mergeMap(loadPayload => {
      const start = new Date(loadPayload.month.getFullYear(), loadPayload.month.getMonth(), 1);
      const end = new Date(loadPayload.month.getFullYear(), loadPayload.month.getMonth() + 1, 0);
      return zip(
        this.vacationService.getVacationList(loadPayload.userId, start, end).pipe(
          map(vacationList => {
            const dayList= new Map<Date, Day>();
            vacationList.forEach(vacationDto => {
              const day = this.vacationService.convertVacationDtoToDay(vacationDto);
              if(dayList.has(day.date)) {
                if(day.am.type && day.am.type != VacationType.UNKNOWN){
                  dayList.get(day.date).am = day.am;
                }
                if(day.pm.type && day.pm.type != VacationType.UNKNOWN){
                  dayList.get(day.date).pm = day.pm;
                }
              } else {
                dayList.set(day.date, day);
              }
            })
            return Array.from(dayList.values());
          })
        ),
        of(loadPayload.reload)
      )
    }),
    map(zipresult => (CalendarAction.vacationLoaded({
      vacations: zipresult[0],
      reload: zipresult[1]
    }))),
    catchError(err => manageWsErrors(EnumErrorFunc.LOAD_VACATION, err))
  ))

  saveVacation$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarAction.saveVacation),
    withLatestFrom(zip(
      this.store.pipe(select(getModifiedDays)),
      this.store.pipe(select(getLoggedUser))
    )),
    concatMap(payload => {
      const [modifiedDays, loggedUser] = payload[1];
      let vacationList: VacationDto[] = [];
      modifiedDays.forEach(modifiedDay => {
        const tmpList = this.vacationService.convertDayToVacationDto(modifiedDay);
        vacationList = vacationList.concat(tmpList);
      });
      return zip(of(vacationList), of(loggedUser));
    }),
    switchMap(payload => {
      const [vacationList, loggedUser] = payload;
      const vacationToDelete: VacationDto[] = [];
      const vacationToAddModify: VacationDto[] = [];
      vacationList.forEach(vacationDto => {
        if(!vacationDto.type || vacationDto.type == VacationType.UNKNOWN) {
          vacationToDelete.push(vacationDto);
        } else {
          vacationToAddModify.push(vacationDto);
        }
      });
      let deleteObservable: Observable<never>;
      if(vacationToDelete.length > 0) {
        deleteObservable = this.vacationService.delete(loggedUser.id, vacationToDelete);
      }
      let modifyObservable: Observable<AskResultDto | undefined>;
      if(vacationToAddModify.length> 0) {
        modifyObservable = this.vacationService.ask(loggedUser.id, vacationToAddModify);
      }
      let result: Observable<AskResultDto | Empty>;
      if(deleteObservable) {
        result = deleteObservable.pipe(deleteResp => {
          if(modifyObservable) {
            return modifyObservable;
          } else {
            return of(new Empty());
          }
        });
      } else if(modifyObservable) {
        result = modifyObservable;
      } else {
        result = of(new Empty());
      }
      return result;
    }),
    tap(askResult => console.log(`${askResult}`)),
    map(askResult => {
      const days = new Map<Date, Day>();
      if(!(askResult instanceof Empty)) {
        askResult.vacationList.forEach(vacation => {
          const date = new Date(vacation.date);
          const convertedDay = this.vacationService.convertVacationDtoToDay(vacation);
          if(vacation.vacationDay === VacationDay.ALL || !days.has(date)) {
            days.set(convertedDay.date, convertedDay);
          } else if(vacation.vacationDay === VacationDay.MORNING) {
            days.get(date).am = convertedDay.am;
          } else if(vacation.vacationDay === VacationDay.AFTERNOON) {
            days.get(date).pm = convertedDay.pm;
          }
        })
      }

      return (CalendarAction.vacationSaved({vacations: Array.from(days.values())}));
    }),
    catchError(err => manageWsErrors(EnumErrorFunc.SAVE_VACATION, err))
  ))

  constructor(
    private actions$: Actions,
    private vacationService: VacationService,
    private store: Store<AppState>
  ) {}
}
