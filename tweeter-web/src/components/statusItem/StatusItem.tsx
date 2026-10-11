import { faJsfiddle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import Post from "./Post";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { useUserNavigation } from "../hooks/NavigationHooks";

interface Props {
  status: Status;
  featurUrl: string; // specifies either story or feed
}
const StatusItem = (props: Props) => {
  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.status.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.status.user.firstName} {props.status.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={`${props.featurUrl}/${props.status.user.alias}`}
                onClick={useUserNavigation(props.featurUrl)}
              >
                {props.status.user.alias}
              </Link>
            </h2>
            {props.status.formattedDate}
            <br />
            <Post status={props.status} featurePath={`${props.featurUrl}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
