import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
