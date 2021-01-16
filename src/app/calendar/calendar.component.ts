import {Component, OnInit} from '@angular/core';
import {VacationType} from '../model/dto';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as _ from "lodash";
import {Store} from "@ngxs/store";
import {LoadVacation, SaveVacation} from "../model/actions/calendar.actions";
import {CalendarState} from "../model/store/calendar.state";
import {LoginState, LoginStateModel} from "../model/store/login.state";

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

    constructor(private store: Store) { }

    ngOnInit(): void {
        const currentDate = new Date();

        const userId = this.store.selectSnapshot<number>(state => state.loginState.connectedUser.id );
        this.store.dispatch(new LoadVacation(true, userId, currentDate));
        this.selectedMonthSubject = new BehaviorSubject<{month: number, year: number}>({month: currentDate.getMonth(), year: currentDate.getFullYear()});
        this.selectedMonthSubject.asObservable().subscribe(monthObj => {
            this.days$ = this.store.select(CalendarState.getVacationForMonth(monthObj.month, monthObj.year))
                .pipe(
                    map(vacations => {
                        const tmpDays: CalendarDay[] = [];
                        this.fillWithPreviousMonth(monthObj.month, monthObj.year, tmpDays);
                        const nbDay = new Date(monthObj.month, monthObj.year, 0).getDate();
                        for (let day = 1; day <= nbDay; day++) {
                            const dayObj = new CalendarDay();
                            dayObj.date = new Date(monthObj.year, monthObj.month, day);
                            const dayOfWeek = dayObj.date.getDay();
                            dayObj.isWorked = dayOfWeek != 6 && dayOfWeek != 0;
                            tmpDays.push(dayObj);
                        }
                        if(vacations) {
                            vacations.forEach(vacation => {
                                const day = {..._.first(_.remove(tmpDays, day => day.date.getDate() === vacation.date.getDate()))};
                                day.pm = vacation.pm.type;
                                day.am = vacation.am.type;
                                tmpDays.push(day);
                            });
                        }
                        return tmpDays;
                    }),
                    map(days => _.sortBy(days, ['date']))
                );
        });
        this.modifiedDays$ = this.store.select(CalendarState.hasModifiedDays);
    }

    private fillWithPreviousMonth(month: number, year: number, tmpDays: CalendarDay[]) {
        let dayInc = 1;
        const firstDate = new Date(year, month, dayInc);
        let tmpDayOfWeek = firstDate.getDay();
        while(tmpDayOfWeek > 1) {
            const dayObj = new CalendarDay();
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
        const monthObj = this.selectedMonthSubject.getValue();
        if(monthObj.month <= 1) {
            monthObj.month = 12;
            monthObj.year--;
        } else {
            monthObj.month--;
        }
        this.selectedMonthSubject.next(monthObj);
    }

    onNextMonthClicked() {
        const monthObj = this.selectedMonthSubject.getValue();
        if(monthObj.month >= 12) {
            monthObj.month = 1;
            monthObj.year++;
        } else {
            monthObj.month++;
        }
        this.selectedMonthSubject.next(monthObj);
    }

    save(){
        this.store.dispatch(new SaveVacation());
    }
}
