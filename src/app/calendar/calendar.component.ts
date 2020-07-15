import { Component, OnInit } from '@angular/core';
import { Day } from '../model/day';
import { VacationType } from '../model/dto';
import {combineLatest, concat, forkJoin, merge, Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState, CalendarState, getVacationForMonth} from "../model/calendar.store";
import {concatMap, map, mergeMap} from "rxjs/operators";
import * as _ from "lodash";

export class CalendarDay {
  date: Date;
  am?: VacationType;
  pm?: VacationType;
  isWorked: boolean;
}
@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days$: Observable<CalendarDay[]>;
  currentDate: Date;
  vacationTypeValues = VacationType;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    const nbDay = new Date(currentYear, currentMonth, 0).getDate();


    this.days$ = this.store.pipe(
        select(getVacationForMonth, {month: currentMonth}),
        map(vacations => {
          let tmpDays : CalendarDay[] = [];
          for(let day = 1; day <= nbDay; day++) {
            let dayObj = new CalendarDay();
            dayObj.date = new Date(currentYear, currentMonth, day);
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
  }
}
