import { AuthToken, Status, FakeData, StatusDto } from "tweeter-shared";
import { Service } from "./Service";

export class StatusService implements Service {
  public async loadMoreStoryItems(
    //need to fix this part
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    return this.getStatusPage(pageSize, lastItem); //FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    return this.getStatusPage(pageSize, lastItem); //FakeData.instance.getPageOfStatuses(lastItem, pageSize);
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
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }
}
