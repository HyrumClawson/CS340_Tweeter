import { LogoutRequest, TweeterResponse } from "tweeter-shared";
import { userService } from "../../services";

export const handler = async (
  request: LogoutRequest,
): Promise<TweeterResponse> => {
  await userService.logout(request.token);
  return {
    success: true,
    message: null,
  };
};
