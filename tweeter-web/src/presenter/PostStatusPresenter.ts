import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/model.service/StatusService";

export interface PostStatusView {
  setIsLoading: (value: boolean) => void;
  displayInfoMessage: (message: string, duration: number) => string;
  setPost: (value: string) => void;
  displayErrorMessage: (message: string) => void;
  deleteMessage: (messageId: string) => void;
}

export class PostStatusPresenter {
  private service: StatusService;
  private _view: PostStatusView;

  public constructor(view: PostStatusView) {
    this.service = new StatusService();
    this._view = view;
  }

  public checkButtonStatus(
    post: string,
    authToken: AuthToken | null,
    currentUser: User | null,
    isLoading: boolean,
  ): boolean {
    return !post.trim() || !authToken || !currentUser || isLoading;
  }

  public async submitPost(
    post: string,
    authToken: AuthToken | null,
    currentUser: User | null,
  ) {
    var postingStatusToastId = "";
    try {
      this._view.setIsLoading(true);
      postingStatusToastId = this._view.displayInfoMessage(
        "Posting status...",
        0,
      );

      const status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this._view.setPost("");
      this._view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`,
      );
    } finally {
      this._view.deleteMessage(postingStatusToastId);
      this._view.setIsLoading(false);
    }
  }
}
