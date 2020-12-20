import {EnumValideur} from "../dto";

const USER_ACTION = '[User Action]';
export const KEY_ADD = USER_ACTION + ' Add';
export const KEY_ADD_SUCCESS = USER_ACTION + ' Added Success';

export class AddUser {
  static readonly type = KEY_ADD;
  constructor(public firstname: string, public lastname: string, public email: string, public secret: string){}
}

export class DeleteUser {
  static readonly type = USER_ACTION + ' Delete';
  constructor(public id: number){}
}

export class ModifyUser {
  static readonly type = USER_ACTION + ' Modify';
  constructor(public id: number, public firstname: string, public lastname: string, public email: string){}
}

export class LoadUsers {
  static readonly type = USER_ACTION + ' Load';
}


export class ModifySecret {
  static readonly type = USER_ACTION + ' Secret';
  constructor(public id: number, public secret: string){}
}

export class ModifyValideur {
  static readonly type = USER_ACTION + " Modify valideur";
  constructor(public idUser: number, public valideurType: EnumValideur){}
}

export class ModifyAdmin {
  static readonly type = USER_ACTION + " Modify admin";
  constructor(public idUser: number, public isAdmin: boolean){}
}
