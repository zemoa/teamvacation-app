import {Component, Input, OnInit} from '@angular/core';
import {VacationType} from "../../../model/dto";

@Component({
  selector: 'app-vacationtype',
  templateUrl: './vacationtype.component.html',
  styleUrls: ['./vacationtype.component.scss']
})
export class VacationtypeComponent {
  vacationTypeValues = VacationType;
  @Input()
  key: VacationType;

}
