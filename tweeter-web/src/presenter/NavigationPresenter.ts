import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";

export interface NavigationView {
  setDisplayedUser: (toUser: User) => void;
  navigate: (path: string) => void;
  displayErrorMessage: (message: string) => void;
}
export class NavigationPresenter {
  private service: UserService;
  private _view: NavigationView;

  public constructor(view: NavigationView) {
    this.service = new UserService();
    this._view = view;
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
    try {
      const toUser = await this.service.getUser(authToken!, alias);
      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          this._view.setDisplayedUser(toUser);
          this._view.navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
  }
}
