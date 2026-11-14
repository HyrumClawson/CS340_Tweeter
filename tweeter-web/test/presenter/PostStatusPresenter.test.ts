import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model.service/model.service/StatusService";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenter/PostStatusPresenter";
import { AuthToken, Status, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
  let mockPostStatusPresenterView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockService: StatusService;
  const authToken = new AuthToken("abc123", Date.now());
  const currUser = new User("David", "Keats", "deats", "image");

  beforeEach(() => {
    mockPostStatusPresenterView = mock<PostStatusView>();
    when(
      mockPostStatusPresenterView.displayInfoMessage(anything(), 0),
    ).thenReturn("messageId123");
    const mockPostStatusPresenterViewInstance = instance(
      mockPostStatusPresenterView,
    );
    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusPresenterViewInstance),
    );
    postStatusPresenter = instance(postStatusPresenterSpy);
    mockService = mock<StatusService>();
    when(postStatusPresenterSpy.service).thenReturn(instance(mockService));
  });

  it("tells the view to display a posting status message", async () => {
    await postStatusPresenter.submitPost("post", authToken, currUser);
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0),
    ).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token", async () => {
    await postStatusPresenter.submitPost("post", authToken, currUser);
    let [capturedAuthoken, capturedStatus] = capture(
      mockService.postStatus,
    ).last();
    expect(capturedAuthoken).toEqual(authToken);
    expect(capturedStatus.post).toEqual("post");
  });

  it("tells the view to clear the info message that was displayed previously, clears the post, and displays a status posted message when successful", async () => {
    await postStatusPresenter.submitPost("post", authToken, currUser);
    verify(mockPostStatusPresenterView.deleteMessage("messageId123")).once();
    verify(mockPostStatusPresenterView.setPost("")).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000),
    ).once();
    verify(mockPostStatusPresenterView.displayErrorMessage(anything())).never();
  });

  it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when not successful", async () => {
    let error = new Error("an error occurred");
    when(mockService.postStatus(authToken, anything())).thenThrow(error);

    await postStatusPresenter.submitPost("post", authToken, currUser);
    verify(mockPostStatusPresenterView.deleteMessage("messageId123")).once();
    verify(
      mockPostStatusPresenterView.displayErrorMessage(
        "Failed to post the status because of exception: an error occurred",
      ),
    ).once();
    verify(mockPostStatusPresenterView.setPost("")).never();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000),
    ).never();
  });
});
