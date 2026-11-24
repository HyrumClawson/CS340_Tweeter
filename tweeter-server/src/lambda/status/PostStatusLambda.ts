import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { statusService } from "../../services";

export const handler = async (
  request: PostStatusRequest,
): Promise<TweeterResponse> => {
  await statusService.postStatus(request.token, request.status);
  return {
    success: true,
    message: null,
  };
};
