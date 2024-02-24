import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";

interface ApplicantCustomHumanProps {
  nodeData: ApplicantNode;
  data: ApplicantReq[];
}

const ApplicantCustomHuman = ({
  nodeData,
  data,
}: ApplicantCustomHumanProps) => {
  const customHumanData = nodeData as ApplicantCustomHumanNode;

  return (
    <>
      <div className="flex items-center pt-6 pb-12">
        <Txt typography="h1" className="px-6 min-w-fit">
          {applicantDataFinder(data, customHumanData.value.hunamName.name)}
        </Txt>
        <div className="h-full flex flex-col gap-2 justify-between">
          <Txt>
            {applicantDataFinder(data, customHumanData.value.humanPhone.name)}
          </Txt>
          <Txt>
            {applicantDataFinder(data, customHumanData.value.humanEmail.name)}
          </Txt>
          <Txt>
            {customHumanData.value.humanEtc
              .map((etc) => applicantDataFinder(data, etc.name))
              .join(" ")}
          </Txt>
        </div>
      </div>
    </>
  );
};

export default ApplicantCustomHuman;
