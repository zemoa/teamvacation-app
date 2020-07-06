import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from "@angular/material/grid-list";
import { DayComponent } from './day/day.component';
import { AddvacationdialogComponent } from './day/addvacationdialog/addvacationdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";


@NgModule({
  declarations: [CalendarComponent, DayComponent, AddvacationdialogComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class CalendarModule { }
