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
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { CoreModule } from '../core/core.module';
import { RemovevacationdialogComponent } from './day/removevacationdialog/removevacationdialog.component';


@NgModule({
  declarations: [CalendarComponent, DayComponent, AddvacationdialogComponent, RemovevacationdialogComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    CoreModule
  ]
})
export class CalendarModule { }
