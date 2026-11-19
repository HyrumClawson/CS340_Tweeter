/**
 * @jest-environment node
 */
// AI-assisted: see AI-ATTRIBUTION.md

import { AuthToken, FakeData, User } from "tweeter-shared";
import { ServerFacade } from "../../src/model/network/ServerFacade";

jest.setTimeout(30000);

describe("ServerFacade integration", () => {
  const facade = new ServerFacade();

  it("registers and returns the expected fake user and a token", async () => {
    const [user, authToken] = await facade.register({
      firstName: "Test",
      lastName: "User",
      alias: "@testuser",
      password: "test-password",
      imageStringBase64:
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
      imageFileExtension: "png",
    });

    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toBe("Allen");
    expect(user.lastName).toBe("Anderson");
    expect(user.alias).toBe("@allen");

    expect(authToken).toBeInstanceOf(AuthToken);
    expect(typeof authToken.token).toBe("string");
    expect(authToken.token.length).toBeGreaterThan(0);
    expect(Number.isFinite(authToken.timestamp)).toBe(true);
  });

  it("returns the expected followers and pagination flag", async () => {
    const userAlias = "@amy";
    const pageSize = 2;
    const [expectedUsers, expectedHasMore] = FakeData.instance.getPageOfUsers(
      null,
      pageSize,
      userAlias,
    );

    const [users, hasMore] = await facade.getMoreFollowers({
      token: "test-token",
      userAlias,
      pageSize,
      lastItem: null,
    });

    expect(users).toHaveLength(pageSize);
    expect(users.every((user) => user instanceof User)).toBe(true);
    expect(users.map((user) => user.dto)).toEqual(
      expectedUsers.map((user) => user.dto),
    );
    expect(hasMore).toBe(expectedHasMore);
  });

  it("returns a positive follower count", async () => {
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Expected a fake user for the test");
    }

    const count = await facade.getFollowersCount({
      token: "test-token",
      user: user.dto,
    });

    expect(Number.isInteger(count)).toBe(true);
    expect(count).toBeGreaterThan(0);
  });
});
