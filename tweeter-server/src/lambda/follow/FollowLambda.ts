import { FollowActionRequest, FollowActionResponse } from "tweeter-shared";
import { followService } from "../../services";

export const handler = async (
  request: FollowActionRequest,
): Promise<FollowActionResponse> => {
  const [followerCount, followeeCount] = await followService.follow(
    request.token,
    request.targetUser,
  );
  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
