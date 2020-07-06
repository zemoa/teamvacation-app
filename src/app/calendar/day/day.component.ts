import { Component, OnInit, ChangeDetectionStrategy,  Input } from '@angular/core';
import { Day } from '../../model/day';
import { AddvacationdialogComponent } from './addvacationdialog/addvacationdialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnInit {
  
  @Input() day: Day;
  @Input() firstOfRow: boolean;
  @Input() firstRow: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  clickOnDay(event: any) {
    console.log("day");
    this.dialog.open(AddvacationdialogComponent, {
      position: {
        left: event.x + "px",
        top: event.y + "px",
      }
    });
  }

  clickOnAm(event: any) {
    console.log("am");
    event.stopPropagation();
  }
  
  clickOnPm(event: any) {
    event.stopPropagation();
    console.log("pm");
  }
}
