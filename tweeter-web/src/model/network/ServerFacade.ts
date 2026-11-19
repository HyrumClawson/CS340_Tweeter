import {
  AuthResponse,
  AuthToken,
  FollowActionRequest,
  FollowActionResponse,
  FollowCountRequest,
  FollowCountResponse,
  GetUserRequest,
  GetUserResponse,
  IsFollowerRequest,
  IsFollowerResponse,
  LoginRequest,
  LogoutRequest,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  PostStatusRequest,
  RegisterRequest,
  Status,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

//note that maybe if I want to eliminate duplication between item and status stuff with generics wil have to change this
//code
export class ServerFacade {
  private SERVER_URL =
    "https://4v1xuos21m.execute-api.us-west-2.amazonaws.com/prod";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followee/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getMoreFollowers(
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/follower/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
  public async getFollowersCount(request: FollowCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowCountRequest,
      FollowCountResponse
    >(request, "/follower/count");

    // Handle errors
    if (response.success) {
      if (response.count == null) {
        throw new Error(`No count was found`);
      } else {
        return response.count;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
  public async getFolloweesCount(request: FollowCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowCountRequest,
      FollowCountResponse
    >(request, "/followee/count");

    // Handle errors
    if (response.success) {
      if (response.count == null) {
        throw new Error(`No count was found`);
      } else {
        return response.count;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getIsFollower(request: IsFollowerRequest): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      IsFollowerRequest,
      IsFollowerResponse
    >(request, "/follower/status");

    // Handle errors
    if (response.success) {
      if (response.isFollower == null) {
        throw new Error(`Couldn't find out if following`);
      } else {
        return response.isFollower;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async follow(
    request: FollowActionRequest,
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowActionRequest,
      FollowActionResponse
    >(request, "/follow");

    // Handle errors
    if (response.success) {
      if (
        typeof response.followerCount !== "number" ||
        typeof response.followeeCount !== "number"
      ) {
        throw new Error(`the server did not return both counts`);
      } else {
        return [response.followerCount, response.followeeCount];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async unfollow(
    request: FollowActionRequest,
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowActionRequest,
      FollowActionResponse
    >(request, "/unfollow");

    // Handle errors
    if (response.success) {
      if (
        typeof response.followerCount !== "number" ||
        typeof response.followeeCount !== "number"
      ) {
        throw new Error(`the server did not return both counts`);
      } else {
        return [response.followerCount, response.followeeCount];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async login(
    request: LoginRequest,
  ): Promise<[user: User, authToken: AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      LoginRequest,
      AuthResponse
    >(request, "/user/login");

    // Handle errors
    if (response.success) {
      const user = User.fromDto(response.user);
      const authToken = AuthToken.fromDto(response.authToken);
      if (user === null || authToken === null) {
        throw new Error(`could not login`);
      } else {
        return [user, authToken];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async register(
    request: RegisterRequest,
  ): Promise<[user: User, authToken: AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      RegisterRequest,
      AuthResponse
    >(request, "/user/register");

    // Handle errors
    if (response.success) {
      const user = User.fromDto(response.user);
      const authToken = AuthToken.fromDto(response.authToken);
      if (user === null || authToken === null) {
        throw new Error(`could not register`);
      } else {
        return [user, authToken];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async logout(request: LogoutRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      LogoutRequest,
      TweeterResponse
    >(request, "/user/logout");

    // Handle errors
    if (!response.success) {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getUser(request: GetUserRequest): Promise<User | null> {
    //a user basically
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      GetUserResponse
    >(request, "/user/get");

    // Handle errors
    if (response.success) {
      const user = User.fromDto(response.user);
      if (user === null) {
        throw new Error(`invalid user alias`);
      } else {
        return User.fromDto(response.user);
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(request, "/status/post");

    // Handle errors
    if (!response.success) {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getStory(
    request: PagedStatusItemRequest,
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/story/list");

    // Convert the StatusDto array returned by ClientCommunicator to a Status array
    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No stories were found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getFeed(
    request: PagedStatusItemRequest,
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/feed/list");

    // Convert the StatusDto array returned by ClientCommunicator to a Status array
    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No feed was found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
}
