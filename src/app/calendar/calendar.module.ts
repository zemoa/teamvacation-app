import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from "@angular/material/grid-list";
import { DayComponent } from './day/day.component';


@NgModule({
  declarations: [CalendarComponent, DayComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    MatGridListModule
  ]
})
export class CalendarModule { }
