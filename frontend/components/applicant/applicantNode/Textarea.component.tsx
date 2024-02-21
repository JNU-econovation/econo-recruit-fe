import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant/applicant";
import { applicantDataFinder } from "@/src/functions/finder";

interface ApplicantTextareaProps {
  nodeData: ApplicantNode;
  data: ApplicantReq[];
}

const ApplicantTextarea = ({ nodeData, data }: ApplicantTextareaProps) => {
  const textareaData = nodeData as ApplicantTextareaNode;

  return (
    <Txt className="block pt-6 pb-12 ml-6">
      {applicantDataFinder(data, textareaData.value.name)}
    </Txt>
  );
};

export default ApplicantTextarea;
