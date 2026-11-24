import { AuthResponse, LoginRequest } from "tweeter-shared";
import { userService } from "../../services";

export const handler = async (request: LoginRequest): Promise<AuthResponse> => {
  const [user, authToken] = await userService.login(
    request.alias,
    request.password,
  );
  return {
    success: true,
    message: null,
    user: user,
    authToken: authToken,
  };
};
