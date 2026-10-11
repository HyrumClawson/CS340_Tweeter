import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useMessageActions } from "../toaster/MessageHooks";

interface Props {
  oAuthHeading: string;
  //displayInfoMessageWithDarkBackground: (message: string) => void;
}
//get rid of duplicate code.

const OAuth = (props: Props) => {
  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayInfoMessage(message, 3000, "text-white bg-primary");
  };
  const { displayInfoMessage } = useMessageActions();
  //if this doesn't work just put everything back behind props.

  const services = [
    { name: "Google", icon: "google", tooltipId: "googleTooltip" },
    { name: "Facebook", icon: "facebook", tooltipId: "facebookTooltip" },
    { name: "Twitter", icon: "twitter", tooltipId: "twitterTooltip" },
    { name: "LinkedIn", icon: "linkedin", tooltipId: "linkedinTooltip" },
    { name: "GitHub", icon: "github", tooltipId: "githubTooltip" },
  ] as const;

  return (
    <>
      <h1 className="h4 mb-3 fw-normal">Or</h1>
      <h1 className="h5 mb-3 fw-normal">{props.oAuthHeading}</h1>
      <div className="text-center mb-3">
        {services.map((service) => (
          <button
            type="button"
            className="btn btn-link btn-floating mx-1"
            onClick={() =>
              displayInfoMessageWithDarkBackground(
                `${service.name} registration is not implemented.`,
              )
            }
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={service.tooltipId}>Google</Tooltip>}
            >
              <FontAwesomeIcon icon={["fab", service.icon]} />
            </OverlayTrigger>
          </button>
        ))}
      </div>
    </>
  );
};

export default OAuth;
