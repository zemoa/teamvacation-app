import { Component, OnInit } from '@angular/core';
import { Day } from '../model/day';
import { VacationType } from '../model/dto';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days: Day[] = [];
  constructor() { }

  ngOnInit(): void {
    var nbDay = new Date(2020, 6, 0).getDate()
  
    for(let day = 1; day <= nbDay; day++) {
      var dayObj = new Day();
      dayObj.nb = day;
      if(day == 1) {
        dayObj.am = VacationType.RTT;
        dayObj.pm = VacationType.Standard;
      }
      this.days.push(dayObj);
    }
  } 
}
