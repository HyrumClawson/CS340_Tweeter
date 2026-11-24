import { AuthToken, Status, FakeData, StatusDto } from "tweeter-shared";
import { Service } from "./Service";
import { StatusDAO, Timeline } from "../dao/StatusDAO";
import { FollowDAO } from "../dao/FollowDAO";
import { UserDAO } from "../dao/UserDAO";
import { AuthorizationService } from "./AuthorizationService";

export class StatusService implements Service {
  public constructor(
    private readonly statusDao: StatusDAO,
    private readonly followDao: FollowDAO,
    private readonly userDao: UserDAO,
    private readonly authorizationService: AuthorizationService,
  ) {}
  public async loadMoreStoryItems(
    //need to fix this part
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    //return this.getStatusPage(pageSize, lastItem); //FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    return this.loadMore(token, "story", userAlias, pageSize, lastItem);
  }

  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    return this.loadMore(token, "story", userAlias, pageSize, lastItem); //this.getStatusPage(pageSize, lastItem); //FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
  private getStatusPage(
    pageSize: number,
    lastItem: StatusDto | null,
  ): [StatusDto[], boolean] {
    const lastStatus = Status.fromDto(lastItem);
    const [statuses, hasMore] = FakeData.instance.getPageOfStatuses(
      lastStatus,
      pageSize,
    );

    return [statuses.map((status) => status.dto), hasMore];
  }

  public async postStatus(token: string, newStatus: StatusDto): Promise<void> {
    const authorAlias = await this.authorizationService.requireUser(token);
    const author = await this.userDao.find(authorAlias);

    if (author === null) {
      throw new Error("unauthorized: User no longer exists");
    }

    if (
      typeof newStatus?.post !== "string" ||
      !newStatus.post.trim() ||
      !Number.isSafeInteger(newStatus.timestamp) ||
      newStatus.timestamp <= 0
    ) {
      throw new Error("bad-request: Invalid status");
    }

    const status: StatusDto = {
      post: newStatus.post,
      user: author.profile,
      timestamp: newStatus.timestamp,
    };

    await this.statusDao.save("story", [authorAlias], status);

    let lastAlias: string | undefined;
    let hasMore: boolean;

    do {
      const [followerAliases, more] = await this.followDao.page(
        authorAlias,
        "followers",
        25,
        lastAlias,
      );

      await this.statusDao.save("feed", followerAliases, status);

      lastAlias = followerAliases.at(-1);
      hasMore = more;
    } while (hasMore);
  }
  private async loadMore(
    token: string,
    timeline: Timeline,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    await this.authorizationService.requireUser(token);
    return this.statusDao.page(timeline, userAlias, pageSize, lastItem);
  }
}
