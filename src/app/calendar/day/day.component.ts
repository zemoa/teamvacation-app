import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AddvacationdialogComponent, AddvacationdialogData} from './addvacationdialog/addvacationdialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VacationDay, VacationType} from "../../model/dto";
import {RemovevacationdialogComponent} from "./removevacationdialog/removevacationdialog.component";
import {CalendarDay} from "../calendar.component";
import {Store} from "@ngxs/store";
import {AddVacation, RemoveVacation} from "../../model/actions/calendar.actions";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnInit {

  @Input() day: CalendarDay;
  @Input() firstOfRow: boolean;
  @Input() firstRow: boolean;
  @Input() vacationType: VacationType;

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
  }

  clickOnDay(event: any) {
    if(!this.day.isOtherMonth && this.day.isWorked) {
      const initalPmChecked = !!this.day.pm;
      const initalAmChecked = !!this.day.am;
      const input: AddvacationdialogData = {
        pm: true,
        disablePm: initalPmChecked,
        am: true,
        disableAm: initalAmChecked,
      };
      const dialogRef = this.dialog.open(AddvacationdialogComponent, {
        data: input,
        position: {
          left: event.x + "px",
          top: event.y + "px",
        }
      });
      dialogRef.afterClosed().subscribe((result: AddvacationdialogData) => {
        if (result && (initalAmChecked !== result.am || initalPmChecked !== result.pm)) {
          let vacationDay: VacationDay;
          if (result.am && result.pm &&
            (
              !initalAmChecked && !initalPmChecked ||
              ((this.day.am == this.vacationType || this.day.pm == this.vacationType))
            )
          ) {
            vacationDay = VacationDay.ALL;
          } else if (!initalAmChecked && result.am) {
            vacationDay = VacationDay.MORNING;
          } else if (!initalPmChecked && result.pm) {
            vacationDay = VacationDay.AFTERNOON;
          }
          if (vacationDay) {
            this.store.dispatch(new AddVacation(this.day.date, this.vacationType, vacationDay));
          }
        }
      });
    }
  }

  clickOnAm(event: any) {
    event.stopPropagation();
    this.openRemoveDialog(event, VacationDay.MORNING);
  }

  clickOnPm(event: any) {
    event.stopPropagation();
    this.openRemoveDialog(event, VacationDay.AFTERNOON);
  }

  clickOnVacationDay(event: any) {
    event.stopPropagation();
    this.openRemoveDialog(event, VacationDay.ALL);
  }

  private openRemoveDialog(event: any, vacationDay: VacationDay) {
    const dialogRef = this.dialog.open(RemovevacationdialogComponent, {
      data: {
        vacationDay: vacationDay
      },
      position: {
        left: event.x + "px",
        top: event.y + "px",
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(new RemoveVacation(this.day.date, undefined, vacationDay));
      }
    });
  }
}
