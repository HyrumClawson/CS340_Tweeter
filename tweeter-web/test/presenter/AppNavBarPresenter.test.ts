import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "@typestrong/ts-mockito";
import {
  AppNavBarPresenter,
  AppNavBarView,
} from "../../src/presenter/AppNavBarPresenter";
import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model.service/model.service/UserService";

describe("AppNavBarPresenter", () => {
  let mockAppNavBarPresenterView: AppNavBarView;
  let appNavBarPresenter: AppNavBarPresenter;
  let mockService: UserService;
  const authToken = new AuthToken("abc123", Date.now()); //doesn't matter now cause we have dummy data but will need to update
  beforeEach(() => {
    mockAppNavBarPresenterView = mock<AppNavBarView>();
    when(
      mockAppNavBarPresenterView.displayInfoMessage(anything(), 0),
    ).thenReturn("messageId123");
    const mockAppNavBarPresenterViewInstance = instance(
      mockAppNavBarPresenterView,
    );
    const appNavBarPresenterSpy = spy(
      new AppNavBarPresenter(mockAppNavBarPresenterViewInstance),
    );
    appNavBarPresenter = instance(appNavBarPresenterSpy);

    mockService = mock<UserService>();
    when(appNavBarPresenterSpy.service).thenReturn(instance(mockService));
  });
  it("tells the view to display a logging out message", async () => {
    await appNavBarPresenter.logOut(authToken);
    verify(
      mockAppNavBarPresenterView.displayInfoMessage("Logging Out...", 0),
    ).once(); //verify it was called at least once
  });
  it("calls logout on the user service with the correct auth token", async () => {
    await appNavBarPresenter.logOut(authToken);
    verify(mockService.logout(authToken)).once();

    // let [capturedAuthoken] = capture(mockService.logout).last();
    // expect(capturedAuthoken).toEqual(authToken);
  });
  it("tells the view to clear the info message that was displayed previously, clear the user info, and navigates to the login page when successful", async () => {
    await appNavBarPresenter.logOut(authToken);
    verify(mockAppNavBarPresenterView.deleteMessage("messageId123")).once();
    verify(mockAppNavBarPresenterView.clearUserInfo()).once();
    verify(mockAppNavBarPresenterView.navigate("/login")).once();
    verify(mockAppNavBarPresenterView.displayErrorMessage(anything())).never();
  });
  it("tells the view to display an error message and does not tell it to clear the info message, clear the user info or navigates to the login page when not successful", async () => {
    let error = new Error("an error occurred");
    when(mockService.logout(anything())).thenThrow(error);
    await appNavBarPresenter.logOut(authToken);
    // let [errorString] = capture(
    //   mockAppNavBarPresenterView.displayErrorMessage,
    // ).last();
    verify(
      mockAppNavBarPresenterView.displayErrorMessage(
        "Failed to log user out because of exception: an error occurred",
      ),
    ).once();
    // console.log(errorString);
    verify(mockAppNavBarPresenterView.deleteMessage(anything())).never();
    verify(mockAppNavBarPresenterView.clearUserInfo()).never();
    verify(mockAppNavBarPresenterView.navigate("/login")).never();
  });
});
