import { Component, OnInit } from '@angular/core';
import { Day } from '../model/day';
import { VacationType } from '../model/dto';
import {BehaviorSubject, combineLatest, concat, forkJoin, merge, Observable, of, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {CalendarState, getVacationForMonth, hasModifiedDays} from "../model/store/calendar.store";
import {concatMap, map, mergeMap} from "rxjs/operators";
import * as _ from "lodash";
import {AppState} from "../model/store/app.state";
import {ElectronService} from "../core/services";
import {saveVacation} from "../model/actions/calendar.actions";

export class CalendarDay {
  date: Date;
  am?: VacationType;
  pm?: VacationType;
  isWorked: boolean;
  isOtherMonth: boolean;
}
@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days$: Observable<CalendarDay[]>;
  modifiedDays$: Observable<boolean>;
  private selectedMonthSubject : BehaviorSubject<{month: number, year: number}>;

  vacationTypeValues = VacationType;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.selectedMonthSubject = new BehaviorSubject<{month: number, year: number}>({month: currentDate.getMonth(), year: currentDate.getFullYear()});
    this.selectedMonthSubject.asObservable().subscribe(monthObj => {
      this.days$ = this.store.pipe(
        select(getVacationForMonth, {month: monthObj.month, year: monthObj.year}),
        map(vacations => {
          let tmpDays : CalendarDay[] = [];
          this.fillWithPreviousMonth(monthObj.month, monthObj.year, tmpDays);
          const nbDay = new Date(monthObj.month, monthObj.year, 0).getDate();
          for(let day = 1; day <= nbDay; day++) {
            let dayObj = new CalendarDay();
            dayObj.date = new Date(monthObj.year, monthObj.month, day);
            const dayOfWeek = dayObj.date.getDay();
            dayObj.isWorked = dayOfWeek != 6 && dayOfWeek != 0;
            tmpDays.push(dayObj);
          }
          vacations.forEach(vacation => {
            let day = {..._.first(_.remove(tmpDays, day => day.date.getDate() === vacation.date.getDate()))};
            day.pm = vacation.pm.type;
            day.am = vacation.am.type;
            tmpDays.push(day);
          });
          return tmpDays;
        }),
        map(days => _.sortBy(days, ['date']))
      );
    });
    this.modifiedDays$ = this.store.pipe(select(hasModifiedDays));
  }

  private fillWithPreviousMonth(month: number, year: number, tmpDays: CalendarDay[]) {
    let dayInc = 1;
    const firstDate = new Date(year, month, dayInc);
    let tmpDayOfWeek = firstDate.getDay();
    while(tmpDayOfWeek > 1) {
      let dayObj = new CalendarDay();
      dayInc--;
      dayObj.date = new Date(year, month, dayInc);
      dayObj.isWorked = false;
      dayObj.isOtherMonth = true;
      tmpDays.push(dayObj);
      tmpDayOfWeek--;
    }
  }
  get dateTitle(): Observable<Date> {
    return this.selectedMonthSubject.asObservable().pipe(map(monthObj => new Date(monthObj.year, monthObj.month)));
  }

  private refresh() {

  }

  onPreviousMonthClicked() {
    let monthObj = this.selectedMonthSubject.getValue();
    if(monthObj.month <= 1) {
      monthObj.month = 12;
      monthObj.year--;
    } else {
      monthObj.month--;
    }
    this.selectedMonthSubject.next(monthObj);
  }

  onNextMonthClicked() {
    let monthObj = this.selectedMonthSubject.getValue();
    if(monthObj.month >= 12) {
      monthObj.month = 1;
      monthObj.year++;
    } else {
      monthObj.month++;
    }
    this.selectedMonthSubject.next(monthObj);
  }

  save(){
    this.store.dispatch(saveVacation())
    // if(this.electronService.isElectron) {
    //   shell.openExternal("mailto:toto.toto@toto.com?subject=sub&body=<h1>texte</h1><p>tutu body</p>&cc=titi@titi.com");
    // }
  }
}
