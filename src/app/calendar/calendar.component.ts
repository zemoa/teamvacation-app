import { Component, OnInit } from '@angular/core';
import { Day } from '../model/day';
import { VacationType } from '../model/dto';
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState, CalendarState, getVacationForMonth} from "../model/calendar.store";
import {map, mergeMap} from "rxjs/operators";
class CalendarDay {
  date: Date;
  am?: VacationType;
  pm?: VacationType;
}
@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days: CalendarDay[] = [];
  currentDate: Date;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    const nbDay = new Date(currentYear, currentMonth, 0).getDate();
    for(let day = 1; day <= nbDay; day++) {
      var dayObj = new CalendarDay();
      dayObj.date = new Date(currentYear, currentMonth, day);
      this.days.push(dayObj);
    }

    this.store.pipe(
        select(getVacationForMonth, {month: currentMonth}),
    ).subscribe(vacations => {
      vacations.forEach(vacation => {
        let day = this.days.find(day => day.date.getDate() === vacation.date.getDate())
        day.pm = vacation.pm.type;
        day.am = vacation.am.type;
      });
    });
  }
}
