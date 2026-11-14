import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";
import { AuthToken, User } from "tweeter-shared";

jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));

describe("Post Status Component", () => {
  const mockUser = mock<User>();
  const mockAuthToken = mock<AuthToken>();
  const mockUserInstance = instance(mockUser);
  const mockAuthTokenInstance = instance(mockAuthToken);
  beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });
  it("starts with the post and clear buttons disabled", () => {
    const { postStatusButton, clearButton } = renderLoginAndGetElements();
    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
  it("enables both buttons when the text field has text", async () => {
    const { user, postField, postStatusButton, clearButton } =
      renderLoginAndGetElements();
    await user.type(postField, "a");
    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });
  it("disables both buttons when the text field is cleared", async () => {
    const { user, postField, postStatusButton, clearButton } =
      renderLoginAndGetElements();
    await user.type(postField, "a");
    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
    await user.clear(postField);
    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
  it("it calls presenter's postStatus method with correct parameters when the Post Status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);
    const postText = "hello";
    const { user, postField, postStatusButton } = renderLoginAndGetElements(
      mockPresenterInstance,
    );
    await user.type(postField, postText);
    await user.click(postStatusButton);

    verify(
      mockPresenter.submitPost(
        postText,
        mockAuthTokenInstance,
        mockUserInstance,
      ),
    ).once();
  });
});

function renderPostStatus(presenter?: PostStatusPresenter) {
  render(
    <MemoryRouter>
      {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
    </MemoryRouter>,
  );
}

function renderLoginAndGetElements(presenter?: PostStatusPresenter) {
  const user = userEvent.setup();
  renderPostStatus(presenter);
  const postStatusButton = screen.getByRole("button", { name: /Post Status/i });
  const clearButton = screen.getByRole("button", { name: /Clear/i });
  const postField = screen.getByLabelText("post");
  return { user, postStatusButton, clearButton, postField };
}
