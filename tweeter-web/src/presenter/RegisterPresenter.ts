import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";
import { Buffer } from "buffer";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export interface RegisterView extends AuthenticationView {
  successOnRegister: (
    user: User,
    authToken: AuthToken,
    rememberMe: boolean,
  ) => void;
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
  private service: UserService;

  public constructor(view: RegisterView) {
    super(view);
    this.service = new UserService();
  }

  public checkSubmitButtonStatus(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageUrl: string,
    imageFileExtension: string,
  ) {
    return (
      !firstName ||
      !lastName ||
      !alias ||
      !password ||
      !imageUrl ||
      !imageFileExtension
    );
  }

  public getFileExtension(file: File) {
    return file.name.split(".").pop();
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean,
  ) {
    await this.doAuthenticationOperation(
      () =>
        this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes,
          imageFileExtension,
        ),
      (user, authToken) =>
        this.view.successOnRegister(user, authToken, rememberMe),
      "register user",
    );
  }

  public convertImageToBytes(imageStringBase64: string): Uint8Array {
    // Remove unnecessary file metadata from the start of the string.
    const imageStringBase64BufferContents =
      imageStringBase64.split("base64,")[1];

    const bytes: Uint8Array = Buffer.from(
      imageStringBase64BufferContents,
      "base64",
    );
    return bytes;
  }
}
