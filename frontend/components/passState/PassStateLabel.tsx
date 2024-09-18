import { ApplicantPassState } from "../../src/apis/kanban";
import { getApplicantPassState } from "../../src/functions/formatter";
import Txt from "../common/Txt.component";

interface PassStateLabelProps {
  passState: ApplicantPassState;
}

// TODO: if you want more reusable component, it's should get addtional prop that custom css style.
const PassStateLabel = ({ passState }: PassStateLabelProps) => {
  return (
    <Txt
      className="w-full flex-1 last:text-right truncate"
      color={
        passState === "non-passed"
          ? "red"
          : passState === "final-passed"
          ? "blue"
          : "black"
      }
    >
      {getApplicantPassState(passState)}
    </Txt>
  );
};

export default PassStateLabel;
