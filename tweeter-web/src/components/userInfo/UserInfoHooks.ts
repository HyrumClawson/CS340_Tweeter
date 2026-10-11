import { useContext } from "react";
import { UserInfoActionsContext, UserInfoContext } from "./UserInfoContexts";

export const useUserInfoActions = () => {
  const { updateUserInfo, clearUserInfo, setDisplayedUser } = useContext(
    UserInfoActionsContext,
  );

  return {
    updateUserInfo,
    clearUserInfo,
    setDisplayedUser,
  };
};

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
