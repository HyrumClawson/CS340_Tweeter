import { useNavigate } from "react-router-dom";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { useMessageActions } from "../toaster/MessageHooks";
import {
  NavigationPresenter,
  NavigationView,
} from "../../presenter/NavigationPresenter";
import { useRef } from "react";

export const useUserNavigation = (featurePath: string) => {
  const { setDisplayedUser } = useUserInfoActions();
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();

  const listener: NavigationView = {
    setDisplayedUser: setDisplayedUser,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
  };

  const presenterRef = useRef<NavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new NavigationPresenter(listener);
  }

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    const alias = presenterRef.current!.extractAlias(event.target.toString());
    presenterRef.current!.navigateToUser(
      authToken,
      displayedUser,
      featurePath,
      alias,
    );
  };

  //everything above. Also need to either pass the featureURL in or extract it from the toString event. Idk

  return navigateToUser;
};
