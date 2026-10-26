import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/model.service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setIsLoading: (value: boolean) => void;
  setPost: (value: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  private service: StatusService;

  public constructor(view: PostStatusView) {
    super(view);
    this.service = new StatusService();
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
    await this.doFailureReportingOperation(async () => {
      this.view.setIsLoading(true);
      postingStatusToastId = this.view.displayInfoMessage(
        "Posting status...",
        0,
      );

      const status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");

    this.view.deleteMessage(postingStatusToastId);
    this.view.setIsLoading(false);
  }
}
