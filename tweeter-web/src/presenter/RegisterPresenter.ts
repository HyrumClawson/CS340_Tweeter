import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/model.service/UserService";

export interface RegisterView {
  setIsLoading: (value: boolean) => void;
  displayErrorMessage: (message: string) => void;
  successOnRegister: (
    user: User,
    authToken: AuthToken,
    rememberMe: boolean,
  ) => void;
}

export class RegisterPresenter {
  private service: UserService;
  private _view: RegisterView;

  public constructor(view: RegisterView) {
    this.service = new UserService();
    this._view = view;
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
    try {
      this._view.setIsLoading(true);

      const [user, authToken] = await this.service.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension,
      );

      this._view.successOnRegister(user, authToken, rememberMe);

      //   updateUserInfo(user, user, authToken, rememberMe);
      //   navigate(`/feed/${user.alias}`);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`,
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }
}
