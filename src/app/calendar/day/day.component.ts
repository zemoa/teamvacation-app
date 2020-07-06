import { Component, OnInit, ChangeDetectionStrategy,  Input } from '@angular/core';
import { VacationType } from '../../model/dto';
import { Day } from '../../model/day';

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

  constructor() { }

  ngOnInit(): void {
  }

}
