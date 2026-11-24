import { Buffer } from "buffer";
import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";
import { Service } from "./Service";
import { AuthTokenDto } from "tweeter-shared/dist/model/dto/AuthTokenDto";
import { ImageDAO } from "../dao/ImageDAO";
import { AuthorizationService } from "./AuthorizationService";
import { UserDAO } from "../dao/UserDAO";
import bcryptjs from "bcryptjs";

export class UserService implements Service {
  public constructor(
    private readonly userDao: UserDAO,
    private readonly imageDao: ImageDAO,
    private readonly authorizationService: AuthorizationService,
  ) {}
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    await this.authorizationService.requireUser(token); // will throw an error if not authorized
    const user = await this.userDao.find(alias);
    return user === null ? null : user.profile;
  }

  public async login(
    alias: string,
    password: string,
  ): Promise<[UserDto, AuthTokenDto]> {
    const user = await this.userDao.find(alias);
    if (!user || !(await bcryptjs.compare(password, user.passwordHash))) {
      throw new Error("bad-request: Invalid alias or password");
    }
    const authTokenDto = await this.authorizationService.start(
      user.profile.alias,
    );

    return [user.profile, authTokenDto];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string,
    imageFileExtension: string,
  ): Promise<[UserDto, AuthTokenDto]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    // const imageStringBase64: string =
    //   Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("bad-request: Invalid registration");
    }

    return [user.dto, FakeData.instance.authToken.dto];
  }

  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }
}
