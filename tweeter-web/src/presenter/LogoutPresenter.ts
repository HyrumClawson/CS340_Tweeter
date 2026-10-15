import { AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";

export interface LogoutView {
  displayInfoMessage: (message: string, duration: number) => string;
  deleteMessage: (id: string) => void;
  clearUserInfo: () => void;
  navigate: (path: string) => void;
  displayErrorMessage: (message: string) => void;
}
export class LogoutPresenter {
  private service: UserService;
  private _view: LogoutView;

  public constructor(view: LogoutView) {
    this.service = new UserService();
    this._view = view;
  }

  public async logOut(authToken: AuthToken | null) {
    const loggingOutToastId = this._view.displayInfoMessage(
      "Logging Out...",
      0,
    );

    try {
      await this.service.logout(authToken!);

      this._view.deleteMessage(loggingOutToastId);
      this._view.clearUserInfo();
      this._view.navigate("/login");
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      );
    }
  }
}
