import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface AuthenticationView extends View {
  setIsLoading: (value: boolean) => void;
}

export class AuthenticationPresenter<
  V extends AuthenticationView,
> extends Presenter<V> {
  protected async doAuthenticationOperation(
    authenticationOperation: () => Promise<[User, AuthToken]>,
    onSuccess: (user: User, authToken: AuthToken) => void,
    operationDescription: string,
  ): Promise<void> {
    try {
      await this.doFailureReportingOperation(async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await authenticationOperation();

        onSuccess(user, authToken);
      }, operationDescription);
    } finally {
      this.view.setIsLoading(false);
    }
  }
}
