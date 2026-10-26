import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface NavigationView extends View {
  setDisplayedUser: (toUser: User) => void;
  navigate: (path: string) => void;
}
export class NavigationPresenter extends Presenter<NavigationView> {
  private service: UserService;

  public constructor(view: NavigationView) {
    super(view);
    this.service = new UserService();
  }
  public extractAlias(value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  }

  public async navigateToUser(
    authToken: AuthToken | null,
    displayedUser: User | null,
    featurePath: string,
    alias: string,
  ): Promise<void> {
    await this.doFailureReportingOperation(async () => {
      const toUser = await this.service.getUser(authToken!, alias);
      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          this.view.setDisplayedUser(toUser);
          this.view.navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    }, "get user");
  }
}
