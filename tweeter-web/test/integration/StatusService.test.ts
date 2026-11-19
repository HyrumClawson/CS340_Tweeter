/**
 * @jest-environment node
 */
// AI-assisted: see AI-ATTRIBUTION.md

import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";

jest.setTimeout(30000);

describe("StatusService integration", () => {
  it("returns the expected first story page", async () => {
    const service = new StatusService();
    const authToken = new AuthToken("test-token", Date.now());
    const pageSize = 2;

    const [expectedStatuses, expectedHasMore] =
      FakeData.instance.getPageOfStatuses(null, pageSize);

    const [statuses, hasMore] = await service.loadMoreStoryItems(
      authToken,
      "@amy",
      pageSize,
      null,
    );

    expect(statuses).toHaveLength(pageSize);

    for (const status of statuses) {
      expect(status).toBeInstanceOf(Status);
      expect(status.user).toBeInstanceOf(User);
    }

    expect(statuses.map((status) => status.dto)).toEqual(
      expectedStatuses.map((status) => status.dto),
    );
    expect(hasMore).toBe(expectedHasMore);
  });
});
