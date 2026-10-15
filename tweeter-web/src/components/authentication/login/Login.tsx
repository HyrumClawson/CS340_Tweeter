import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import AuthenticationFields from "../authenticationfields/AuthenticationFields";
import { useMessageActions } from "../../toaster/MessageHooks";
import { useUserInfoActions } from "../../userInfo/UserInfoHooks";
import { LoginPresenter, LoginView } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoActions();
  const { displayErrorMessage } = useMessageActions();

  const listener: LoginView = {
    //implement setIsLoading, displayErrorMessage, and combined loginSucces methods
    setIsLoading: setIsLoading,
    displayErrorMessage: displayErrorMessage,
    loginSuccess: (user, authToken, rememberMe) => {
      updateUserInfo(user, user, authToken, rememberMe);
      if (!!props.originalUrl) {
        navigate(props.originalUrl);
      } else {
        navigate(`/feed/${user.alias}`);
      }
    },
  };
  //might need to do something similar with the listener as well so no stale data
  const presenterRef = useRef<LoginPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new LoginPresenter(listener); // causing infinite loop
  }

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key == "Enter" &&
      !presenterRef.current!.checkSubmitButtonStatus(alias, password)
    ) {
      presenterRef.current!.doLogin(alias, password, rememberMe);
    }
  };

  const inputFieldFactory = () => {
    return (
      <AuthenticationFields
        registerOrLogin={loginOnEnter}
        setAlias={setAlias}
        setPassword={setPassword}
      />
    );
  };

  const switchAuthenticationMethodFactory = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldFactory={inputFieldFactory}
      switchAuthenticationMethodFactory={switchAuthenticationMethodFactory}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() =>
        presenterRef.current!.checkSubmitButtonStatus(alias, password)
      }
      isLoading={isLoading}
      submit={() => presenterRef.current!.doLogin(alias, password, rememberMe)} //might need to add a getter ??
    />
  );
};

export default Login;
