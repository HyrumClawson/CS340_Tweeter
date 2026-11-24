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

  // private createDto(user: User): UserDto {
  //   return {
  //     firstname: user.firstName,
  //     lastname: user.lastName,
  //     alias: user.alias,
  //     imageUrl: user.imageUrl,
  //   };
  // }
  // private getDomainObject(dto: UserDto | null): User | null {
  //   return dto == null
  //     ? null
  //     : new User(dto.firstname, dto.lastname, dto.alias, dto.imageUrl);
  // }

  public async follow(
    token: string,
    userToFollow: UserDto,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(
      token,
      userToFollow, //I've edited this while chanigng the count stuff
    );

    return [followerCount, followeeCount];
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

    return [followerCount, followeeCount];
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto,
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }
  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  private async changeFollow(
    token: string,
    targetAlias: string,
    following: boolean,
  ): Promise<[number, number]> {
    const userAlias = await this.authorizationService.requireUser(token);
    if (!userAlias || userAlias == targetAlias) {
      throw new Error("Bad-Requeset"); //add more to this error
    }
    const change = await this.followDao.change(
      userAlias,
      targetAlias,
      following,
    );
    if (!change) {
      throw new Error("already in requested state");
    }
    const targetUser = await this.userDao.find(targetAlias);
    return [targetUser?.followerCount, targetUser?.followeeCount];
  }
}
