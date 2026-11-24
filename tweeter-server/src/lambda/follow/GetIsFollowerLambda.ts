import { IsFollowerRequest, IsFollowerResponse } from "tweeter-shared";
import { followService } from "../../services";

export const handler = async (
  request: IsFollowerRequest,
): Promise<IsFollowerResponse> => {
  const isFollower = await followService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser,
  );
  return {
    success: true,
    message: null,
    isFollower: isFollower,
  };
};
