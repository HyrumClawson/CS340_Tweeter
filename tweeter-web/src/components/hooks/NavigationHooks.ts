import { useNavigate } from "react-router-dom";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";

export const useUserNavigation = (featurePath: string) => {
  const { setDisplayedUser } = useUserInfoActions();
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };
  //everything above. Also need to either pass the featureURL in or extract it from the toString event. Idk

  return navigateToUser;
};
