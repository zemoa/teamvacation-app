import {EnumValideur} from "./dto";

export class User {
  id: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
}
export class RoleDto {
  id: number;
  name: string;
}

export class UserExt extends User {
  roleList: RoleDto[];
  valideurState: EnumValideur;
}
export class UserModel extends UserExt {
  saving: boolean;
}
