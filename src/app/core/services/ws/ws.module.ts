import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VacationService } from "./vacation.service";
import {UserService} from "./user.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [VacationService, UserService]
})
export class ServiceModule { }
