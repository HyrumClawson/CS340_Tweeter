import { AuthToken, Status, FakeData } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class StatusService implements Service {
  private serverFacade = new ServerFacade();
  public async loadMoreStoryItems(
    //need to fix this part
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status,
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));
    const userDto = newStatus.user.dto;
    await this.serverFacade.postStatus({
      token: authToken.token,
      status: newStatus.dto, // need to add this function to the status object
    });

    // TODO: Call the server to post the status
  }
}
