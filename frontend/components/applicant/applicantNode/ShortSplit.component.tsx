import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";

interface ApplicantShortSplitProps {
  nodeData: ApplicantNode;
  data: ApplicantReq[];
}

const ApplicantShortSplit = ({ nodeData, data }: ApplicantShortSplitProps) => {
  const shortSplitData = nodeData as ApplicantShortSplitNode;

  return (
    <div className="flex items-center pt-6 pb-12 gap-12 ml-6">
      {shortSplitData.value.map((value, index) => (
        <div key={index}>
          <Txt typography="h6" className="block mb-2">
            {value.title}
          </Txt>
          <Txt>{applicantDataFinder(data, value.name)}</Txt>
        </div>
      ))}
    </div>
  );
};

export default ApplicantShortSplit;
