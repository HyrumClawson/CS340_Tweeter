import { AuthToken } from "tweeter-shared";
import { FollowService } from "../model.service/model.service/FollowService";
import { UserService } from "../model.service/model.service/UserService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";
export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  private service: FollowService;

  public constructor(view: UserItemView) {
    super(view);
    this.service = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.service.loadMoreFollowees(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem,
      );

      this.hasMoreItems = hasMore;
      this.lastItem =
        newItems.length > 0 ? newItems[newItems.length - 1] : null; //uh oh this could be undefined
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followees because of exception: ${error}`, //need to update for both
      );
    }
  }
}
