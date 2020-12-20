import {User} from "../user";
const LOGIN_ACTION = '[Login Action]';

export class Login {
  static readonly type = LOGIN_ACTION + " login";
  constructor(public login: string, public secret: string) {
  }
}

export class InitLogin {
  static readonly type = LOGIN_ACTION + " initLogin";
}
export class LogginError {
  static readonly type =LOGIN_ACTION + " error";
}

export class Logout {
  static readonly type =LOGIN_ACTION + " logout";
}

export class Save {
  static readonly type =LOGIN_ACTION + " Save";
  constructor(public user: User){}
}
