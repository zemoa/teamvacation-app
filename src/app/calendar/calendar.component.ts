import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days: string[] = [];
  constructor() { }

  ngOnInit(): void {
    var nbDay = new Date(2020, 6, 0).getDate()
  
    for(let day = 1; day <= nbDay; day++) {
      this.days.push(day.toString());
    }
  } 
}
