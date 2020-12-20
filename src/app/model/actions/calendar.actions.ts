import {VacationDay, VacationType} from "../dto";

export class AddVacation {
  static readonly type = '[Calendar Action] Add';
  constructor(public aDate: Date, public aType: VacationType, public partOfDay: VacationDay){}
}
export class RemoveVacation {
  static readonly type = '[Calendar Action] Remove';
  constructor(public aDate: Date, public aType: VacationType, public partOfDay: VacationDay){}
}
export class LoadVacation {
  static readonly type = '[Calendar Action] Load';
  constructor(public reload:boolean, public userId: number, public month: Date){}
}

export class SaveVacation {
  static readonly type = '[Calendar Action] Save';
}
