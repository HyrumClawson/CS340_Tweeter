import { AuthResponse, RegisterRequest } from "tweeter-shared";
import { userService } from "../../services";

export const handler = async (
  request: RegisterRequest,
): Promise<AuthResponse> => {
  const [user, authToken] = await userService.register(
    request.firstName,
    request.lastName,
    request.alias,
    request.password,
    request.imageStringBase64,
    request.imageFileExtension,
  );
  return {
    success: true,
    message: null,
    user: user,
    authToken: authToken,
  };
};
