// AI-assisted: see AI-ATTRIBUTION.md
export type FollowDirection = "followers" | "followees";

export interface FollowDAO {
  exists(follower: string, followee: string): Promise<boolean>;

  change(
    follower: string,
    followee: string,
    following: boolean,
  ): Promise<boolean>;

  page(
    alias: string,
    direction: FollowDirection,
    pageSize: number,
    lastAlias?: string,
  ): Promise<[aliases: string[], hasMore: boolean]>;
}
