import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";
import { Service } from "./Service";
import { FollowDAO } from "../dao/FollowDAO";
import { UserDAO } from "../dao/UserDAO";
import { AuthorizationService } from "./AuthorizationService";

export class FollowService implements Service {
  public constructor(
    private readonly followDao: FollowDAO,
    private readonly userDao: UserDAO,
    private readonly authorizationService: AuthorizationService,
  ) {}

  loadMoreFollowees = async (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> => {
    // TODO: Replace with the result of calling server
    return this.getFakeData(lastItem, pageSize, userAlias);
  };

  loadMoreFollowers = async (
    // need to fix this as well for both
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> => {
    // TODO: Replace with the result of calling server
    return this.getFakeData(lastItem, pageSize, userAlias);
  };

  private async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string,
  ): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias,
    );
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }

  public async follow(
    token: string,
    userToFollow: UserDto,
  ): Promise<[followerCount: number, followeeCount: number]> {
    return await this.changeFollow(token, userToFollow.alias, true);
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto,
  ): Promise<[followerCount: number, followeeCount: number]> {
    return await this.changeFollow(token, userToUnfollow.alias, false);
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto,
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.isFollower();
    const signedInAlias = await this.authorizationService.requireUser(token);
    return this.followDao.exists(signedInAlias, selectedUser.alias);
  }

  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return this.getFollowCount(token, user.alias, "followeeCount");
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return this.getFollowCount(token, user.alias, "followerCount");
  }

  private async changeFollow(
    token: string,
    targetAlias: string,
    following: boolean,
  ): Promise<[number, number]> {
    const userAlias = await this.authorizationService.requireUser(token);
    if (userAlias === targetAlias) {
      throw new Error("bad-request: You cannot follow or unfollow yourself"); //add more to this error
    }
    if ((await this.userDao.find(targetAlias)) === null) {
      throw new Error("bad-request: User not found");
    }
    const change = await this.followDao.change(
      userAlias,
      targetAlias,
      following,
    );
    if (!change) {
      throw new Error("bad-request: already in requested state");
    }
    const targetUser = await this.userDao.find(targetAlias);
    if (targetUser === null) {
      throw new Error("bad-request: User not found");
    }
    return [targetUser.followerCount, targetUser.followeeCount];
  }

  private async getFollowCount(
    token: string,
    alias: string,
    field: "followerCount" | "followeeCount",
  ): Promise<number> {
    await this.authorizationService.requireUser(token);

    const user = await this.userDao.find(alias);
    if (user === null) {
      throw new Error("bad-request: User not found");
    }

    return user[field];
  }
}
