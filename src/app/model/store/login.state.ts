import {User} from "../user";
import {Role} from "../dto";
import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {InitLogin, LogginError, Login, Logout, Save} from "../actions/login.actions";
import {AuthService} from "../../core/services/ws/auth.service";
import {UserService} from "../../core/services/ws/user.service";

export interface LoginStateModel {
  connectedUser: User | undefined | null;
  token: string | undefined | null;
  connected: boolean;
  roles: Role[];
  connecting: boolean;
  error: boolean;
}
const initialState: LoginStateModel = {
  connected: false,
  connectedUser: undefined,
  roles: [],
  token: undefined,
  connecting: false,
  error: false
};

@State<LoginStateModel>({
  name: "loginState",
  defaults: initialState
})
@Injectable()
export class LoginState {
  constructor(private authService: AuthService, private userService: UserService) {
  }
  @Action(Login)
  async login(ctx: StateContext<LoginStateModel>, action: Login) {
    ctx.patchState({
      connecting: true,
      error: false
    });
    try {
      const token = await this.authService.login(action.login, action.secret).toPromise();
      const userResult = await this.userService.getLogged().toPromise();
      ctx.patchState({
        connected: true,
        connectedUser: userResult,
        token: token,
        connecting: false,
        error: false,
        roles: [] // TODO
      })
    } catch (error) {
      console.warn(`Error while login: ${error}`);
      ctx.dispatch(new LogginError());
    }
  }
  @Action(InitLogin)
  async initLogin(ctx: StateContext<LoginStateModel>) {
    try {
      if(this.authService.token) {
        const user = await this.userService.getLogged().toPromise();
        ctx.patchState({
          token: this.authService.token,
          connected: true,
          connectedUser: user,
          connecting: false,
          error: false,
          roles: [] // TODO
        })
      }
    } catch (error) {
      ctx.dispatch(new Logout());
    }
  }
  @Action(LogginError)
  loginError(ctx: StateContext<LoginStateModel>) {
    ctx.patchState({
      connecting: false,
      token: undefined,
      connectedUser: undefined,
      connected: false,
      error: true,
      roles: []
    })
  }
  @Action(Logout)
  async loggedout(ctx: StateContext<LoginStateModel>) {
    await this.authService.logout();
    ctx.setState(initialState);
  }
  @Action(Save)
  async save(ctx: StateContext<LoginStateModel>, action: Save) {
    const saveResult = await this.userService
      .saveUser(action.user.id, action.user.firstName, action.user.lastName, action.user.email).toPromise();
    ctx.patchState({
      connectedUser: saveResult
    })
  }
}
