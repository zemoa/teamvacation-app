import {UserModel} from "../user";
import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {
  AddUser,
  DeleteUser,
  LoadUsers,
  ModifyAdmin,
  ModifySecret,
  ModifyUser,
  ModifyValideur
} from "../actions/user.actions";
import {UserService} from "../../core/services/ws/user.service";
import {manageWsErrors} from "../../shared/helpers/utils.helper";
import {EnumErrorFunc} from "../TVError";
import {append, patch, removeItem, updateItem} from "@ngxs/store/operators";
import Utils from "../../shared/utils/Utils";

export interface UserStateModel {
  loading: boolean;
  saving: boolean;
  users: UserModel[];
}

export const initialState: UserStateModel = {
  loading: false,
  saving: false,
  users: [
  ],
};

@State<UserStateModel>({
  name: "userState",
  defaults: initialState
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Action(AddUser)
  async addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    ctx.patchState({
      saving: true
    })
    try {
      const newUser = await this.userService.createUser(action.firstname, action.lastname, action.email, action.secret).toPromise();
      ctx.setState(
        patch({
          users: append([newUser])
        })
      )
    } catch (error) {
      manageWsErrors(EnumErrorFunc.CREATE_USER, error, ctx);
    } finally {
      ctx.patchState({
        saving: false
      })
    }
  }

  @Action(DeleteUser)
  async deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    ctx.patchState({
      saving: true
    });
    try {
      const deletedId = await this.userService.deleteUser(action.id).toPromise();
      ctx.setState(
        patch({
          users: removeItem<UserModel>(user => user.id === deletedId)
        })
      )
    } catch (error) {
      manageWsErrors(EnumErrorFunc.DELETE_USER, error, ctx);
    } finally {
      ctx.patchState({
        saving: false
      });
    }

  }
  @Action(ModifyUser)
  async modifyUser(ctx: StateContext<UserStateModel>, action: ModifyUser) {
    ctx.patchState({
      saving: true
    });
    try {
      const modifiedUser = await this.userService.saveUser(action.id, action.firstname, action.lastname, action.email).toPromise();
      ctx.setState(
        patch({
          users: updateItem<UserModel>(user => user.id === modifiedUser.id, modifiedUser as UserModel)
        })
      )
    } catch (error) {
      manageWsErrors(EnumErrorFunc.SAVE_USER, error, ctx);
    } finally {
      ctx.patchState({
        saving: false
      });
    }
  }
  @Action(LoadUsers)
  async loadUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      loading: true
    })
    try {
      const users = await this.userService.loadUsersAdmin().toPromise();
      ctx.patchState({
        loading: false,
        users: users as UserModel[]
      })
    } catch (error) {
      ctx.patchState({
        loading: false
      })
      manageWsErrors(EnumErrorFunc.LOAD_USER, error, ctx);
    }
  }
  @Action(ModifySecret)
  async modifySecret(ctx: StateContext<UserStateModel>, action: ModifySecret) {
    ctx.patchState({
      saving: true
    })
    try {
      await this.userService.modifySecret(action.id, action.secret).toPromise();
    } catch (error) {
      manageWsErrors(EnumErrorFunc.MODIFY_SECRET, error, ctx);
    } finally {
      ctx.patchState({
        saving: true
      })
    }


  }
  @Action(ModifyValideur)
  async modifyValideur(ctx: StateContext<UserStateModel>, action: ModifyValideur) {
    try {
      const modifiedValideur = await this.userService.changeValideur(action.idUser, action.valideurType).toPromise();
      const state = ctx.getState();
      ctx.patchState({
        users: Utils.modifyIntoList<UserModel>(state.users, user => user.id === modifiedValideur.id,
          value => {
            return {
              ...value,
              valideurState: action.valideurType
            }
          })
      })
    } catch (error) {
      manageWsErrors(EnumErrorFunc.MODIFY_VALIDEUR, error, ctx);
    }
  }

  @Action(ModifyAdmin)
  async modifyAdmin(ctx: StateContext<UserStateModel>, action: ModifyAdmin) {
    try {
      const user = await this.userService.changeAdmin(action.idUser, action.isAdmin).toPromise();
    } catch (error) {
      manageWsErrors(EnumErrorFunc.MODIFIY_ADMIN, error, ctx);
    }
  }

  @Selector()
  static getUsersWithRoles(roleId: number){
    return createSelector([UserState], (state: UserStateModel) => {
      return state.users.filter(
        user => user.roleList && user.roleList.some(value => value.id === roleId)
      )
    });
  }
}



