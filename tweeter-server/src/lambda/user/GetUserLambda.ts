import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { userService } from "../../services";

export const handler = async (
  request: GetUserRequest,
): Promise<GetUserResponse> => {
  const user = await userService.getUser(request.token, request.alias);
  return {
    success: true,
    message: null,
    user: user,
  };
};
