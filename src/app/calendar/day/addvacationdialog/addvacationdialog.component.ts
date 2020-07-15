import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Store} from "@ngrx/store";
import {AppState} from "../../../model/calendar.store";

export interface AddvacationdialogData {
  am?: boolean;
  pm?: boolean;
  disablePm: boolean,
  disableAm: boolean
}
@Component({
  selector: 'app-addvacationdialog',
  templateUrl: './addvacationdialog.component.html',
  styleUrls: ['./addvacationdialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddvacationdialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AddvacationdialogData) { }

  ngOnInit(): void {
  }

  onAccept(){

  }
}
