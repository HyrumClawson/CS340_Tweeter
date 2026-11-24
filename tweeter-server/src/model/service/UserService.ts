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
    const user = await this.userDao.find(alias);
    if (user) {
      throw new Error("bad-request: alias is taken");
    }
    const passwordHash = await bcryptjs.hash(password, 10); //hopefully the 10 will be okay
    const userImageBytes = Buffer.from(imageStringBase64, "base64");
    const { extension, contentType } = this.getImageFormat(imageFileExtension);
    const returnUrl = await this.imageDao.upload(
      userImageBytes,
      contentType,
      extension,
    );
    const profile = {
      firstname: firstName,
      lastname: lastName,
      alias: alias,
      imageUrl: returnUrl,
    };
    const createUser = await this.userDao.create(profile, passwordHash);
    if (!createUser) {
      await this.imageDao.remove(returnUrl);
      throw new Error("bad-request: duplicate alias error");
    }
    const authTokenDto = await this.authorizationService.start(profile.alias);

    return [profile, authTokenDto];
  }

  public async logout(token: string): Promise<void> {
    await this.authorizationService.logout(token); //checks to see if authorized.
  }

  private getImageFormat(imageFileExtension: string): {
    extension: string;
    contentType: string;
  } {
    const extension = imageFileExtension
      .trim()
      .toLowerCase()
      .replace(/^\./, "");

    const contentTypes = new Map([
      ["png", "image/png"],
      ["jpg", "image/jpeg"],
      ["jpeg", "image/jpeg"],
      ["gif", "image/gif"],
      ["webp", "image/webp"],
    ]);

    const contentType = contentTypes.get(extension);
    if (!contentType) {
      throw new Error("bad-request: Unsupported profile image format");
    }

    return { extension, contentType };
  }
}
