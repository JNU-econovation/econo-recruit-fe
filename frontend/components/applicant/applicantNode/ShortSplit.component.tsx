import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import { FC } from "react";

interface ApplicantShortSplitProps {
  nodeData: ApplicantNode;
  data: ApplicantReq[];
}

const ApplicantShortSplit: FC<ApplicantShortSplitProps> = ({
  nodeData,
  data,
}) => {
  const shortSplitData = nodeData as ApplicantShortSplitNode;

  return (
    <>
      <Txt typography="h6">{shortSplitData.title}</Txt>
      <div className="flex items-center pt-6 pb-12 gap-12">
        {shortSplitData.value.map((value, index) => (
          <div key={index}>
            <Txt typography="h6" className="block mb-2">
              {value.title}
            </Txt>
            <Txt>{applicantDataFinder(data, value.name)}</Txt>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicantShortSplit;
