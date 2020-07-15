import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {VacationDay} from "../../../model/dto";

export interface RemovevacationdialogData {
  vacationDay: VacationDay
}

@Component({
  selector: 'app-removevacationdialog',
  templateUrl: './removevacationdialog.component.html',
  styleUrls: ['./removevacationdialog.component.scss']
})
export class RemovevacationdialogComponent implements OnInit {
  vacationDayValues = VacationDay;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RemovevacationdialogData) { }

  ngOnInit(): void {
  }

}
