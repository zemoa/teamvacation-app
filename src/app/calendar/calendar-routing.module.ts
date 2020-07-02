import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';


const routes: Routes = [{
  path: 'calendar',
  component: CalendarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {


}
