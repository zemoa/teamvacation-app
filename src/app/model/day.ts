import { VacationType } from "./dto";

export class Day {
    date: Date;
    am: ModifiedType = new ModifiedType();
    pm: ModifiedType = new ModifiedType();
}

export class ModifiedType {
  type?: VacationType;
  modified = false;
  id: number;
  validated: boolean;
}
