import { AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";
import { MessageView, Presenter } from "./Presenter";

export interface LogoutView extends MessageView {
  clearUserInfo: () => void;
  navigate: (path: string) => void;
}
export class LogoutPresenter extends Presenter<LogoutView> {
  private service: UserService;

  public constructor(view: LogoutView) {
    super(view);
    this.service = new UserService();
  }

  public async logOut(authToken: AuthToken | null) {
    const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
    await this.doFailureReportingOperation(async () => {
      await this.service.logout(authToken!);

      this.view.deleteMessage(loggingOutToastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    }, "log user out");
  }
}
