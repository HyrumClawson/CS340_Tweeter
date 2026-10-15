import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";

export interface LoginView {
  setIsLoading: (value: boolean) => void;
  displayErrorMessage: (message: string) => void;
  loginSuccess: (user: User, authToken: AuthToken, rememberMe: boolean) => void; //updateUserInfo and navigate
}
export class LoginPresenter {
  private service: UserService;
  private _view: LoginView;
  //might have to add a variable for something...

  public constructor(view: LoginView) {
    this.service = new UserService();
    this._view = view;
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    //prolly need to have some arguments now
    try {
      this._view.setIsLoading(true); //setIsLoading(true);

      const [user, authToken] = await this.service.login(alias, password);

      this._view.loginSuccess(user, authToken, rememberMe);

      //   updateUserInfo(user, user, authToken, rememberMe);

      //   if (!!props.originalUrl) {
      //     navigate(props.originalUrl);
      //   } else {
      //     navigate(`/feed/${user.alias}`);
      //   }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`,
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
