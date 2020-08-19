import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import {AdminModule} from "./admin/admin.module";
import {SettingsModule} from "./settings/settings.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    CalendarModule,
    SettingsModule,
    AdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
