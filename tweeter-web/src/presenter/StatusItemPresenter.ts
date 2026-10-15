import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/model.service/StatusService";
import { UserService } from "../model.service/model.service/UserService";

export interface StatusItemView {
  addItems: (newItems: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}
export abstract class StatusItemPresenter {
  private _view: StatusItemView;
  private userService: UserService;
  private _hasMoreItems = true;
  private _lastItem: Status | null = null;

  protected constructor(view: StatusItemView) {
    this._view = view;
    this.userService = new UserService(); // do I need this in this parent presenter??? We will see
  }
  protected get view() {
    return this._view;
  }
  protected set lastItem(value: Status | null) {
    this._lastItem = value;
  }
  protected get lastItem() {
    return this._lastItem;
  }
  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }
  public get hasMoreItems() {
    return this._hasMoreItems;
  }
  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;

  public async getUser(
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> {
    // TODO: Replace with the result of calling server
    return await this.userService.getUser(authToken, alias);
  }
}
