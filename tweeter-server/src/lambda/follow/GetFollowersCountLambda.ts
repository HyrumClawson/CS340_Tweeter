import { FollowCountRequest, FollowCountResponse } from "tweeter-shared";
import { followService } from "../../services";

export const handler = async (
  request: FollowCountRequest,
): Promise<FollowCountResponse> => {
  const count = await followService.getFollowerCount(
    request.token,
    request.user,
  );
  return {
    success: true,
    message: null,
    count: count,
  };
};
