import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/model.service/FollowService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;
}
export class UserInfoPresenter extends Presenter<UserInfoView> {
  private service: FollowService;

  public constructor(view: UserInfoView) {
    super(view);
    this.service = new FollowService();
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) {
    await this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!,
          ),
        );
      }
    }, "determine follower status");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    await this.doFailureReportingOperation(async () => {
      this.view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser),
      );
    }, "get followees count");
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    await this.doFailureReportingOperation(async () => {
      this.view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser),
      );
    }, "get followers count");
  }

  public async followDisplayedUser(
    displayedUser: User, //might pay for this...
    authToken: AuthToken | null,
  ): Promise<void> {
    await this.updateFollowers(
      displayedUser,
      () => this.service.follow(authToken!, displayedUser!),
      "Following",
      "follow user",
      true,
    );
  }

  public async unfollowDisplayedUser(
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> {
    await this.updateFollowers(
      displayedUser,
      () => this.service.unfollow(authToken!, displayedUser!),
      "Unfollowing",
      "unfollow user",
      false,
    );
  }

  private async updateFollowers(
    displayedUser: User,
    updateOperation: () => Promise<[number, number]>,
    operationDescription: string,
    errorDescription: string,
    isFollowing: boolean,
  ): Promise<void> {
    var deleteMessageUserToast = "";
    try {
      await this.doFailureReportingOperation(async () => {
        this.view.setIsLoading(true);
        deleteMessageUserToast = this.view.displayInfoMessage(
          `${operationDescription} ${displayedUser!.name}...`,
          0,
        );

        const [followerCount, followeeCount] = await updateOperation();

        this.view.setIsFollower(isFollowing);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      }, errorDescription);
    } finally {
      //maybe add conditional?
      this.view.deleteMessage(deleteMessageUserToast);
      this.view.setIsLoading(false);
    }
  }
}
