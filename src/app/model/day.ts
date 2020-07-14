import { VacationType } from "./dto";

export class Day {
    date: Date;
    am: ModifiedType;
    pm: ModifiedType;

}

export class ModifiedType {
  type?: VacationType;
  modified = false;
}
