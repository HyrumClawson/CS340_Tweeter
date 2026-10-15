import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/model.service/FollowService";

export interface FollowingView {
  setIsFollower: (value: boolean) => void;
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number) => string;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
  deleteMessage: (value: string) => void;
  setIsLoading: (value: boolean) => void;
}
export class FollowingPresenter {
  private service: FollowService;
  private _view: FollowingView;

  public constructor(view: FollowingView) {
    this.service = new FollowService();
    this._view = view;
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) {
    try {
      if (currentUser === displayedUser) {
        this._view.setIsFollower(false);
      } else {
        this._view.setIsFollower(
          await this.service.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!,
          ),
        );
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`,
      );
    }
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    try {
      this._view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser),
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`,
      );
    }
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    try {
      this._view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser),
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`,
      );
    }
  }

  public async followDisplayedUser(
    displayedUser: User | null,
    authToken: AuthToken | null,
  ): Promise<void> {
    var followingUserToast = "";

    try {
      this._view.setIsLoading(true);
      followingUserToast = this._view.displayInfoMessage(
        `Following ${displayedUser!.name}...`,
        0,
      );

      const [followerCount, followeeCount] = await this.service.follow(
        authToken!,
        displayedUser!,
      );

      this._view.setIsFollower(true);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`,
      );
    } finally {
      this._view.deleteMessage(followingUserToast);
      this._view.setIsLoading(false);
    }
  }

  public async unfollowDisplayedUser(
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> {
    var unfollowingUserToast = "";

    try {
      this._view.setIsLoading(true);
      unfollowingUserToast = this._view.displayInfoMessage(
        `Unfollowing ${displayedUser!.name}...`,
        0,
      );

      const [followerCount, followeeCount] = await this.service.unfollow(
        authToken!,
        displayedUser!,
      );

      this._view.setIsFollower(false);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`,
      );
    } finally {
      this._view.deleteMessage(unfollowingUserToast);
      this._view.setIsLoading(false);
    }
  }
}
