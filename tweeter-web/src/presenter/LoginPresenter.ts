import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export interface LoginView extends AuthenticationView {
  loginSuccess: (user: User, authToken: AuthToken, rememberMe: boolean) => void; //updateUserInfo and navigate
}
export class LoginPresenter extends AuthenticationPresenter<LoginView> {
  private service: UserService;

  public constructor(_view: LoginView) {
    super(_view);
    this.service = new UserService();
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    //prolly need to have some arguments now
    await this.doAuthenticationOperation(
      () => this.service.login(alias, password),
      (user, authToken) => this.view.loginSuccess(user, authToken, rememberMe),
      "log user in",
    );
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
