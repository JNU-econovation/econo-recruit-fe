import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";

interface ApplicantCustomFieldProps {
  nodeData: ApplicantNode;
  data: ApplicantReq[];
}

const ApplicantCustomField = ({
  nodeData,
  data,
}: ApplicantCustomFieldProps) => {
  const customFieldData = nodeData as ApplicantCustomFieldNode;

  return (
    <>
      <div className="flex items-center pt-6 pb-12">
        <Txt typography="h1" className="mx-6">
          {applicantDataFinder(data, customFieldData.value.name)}
        </Txt>
        <div className="h-full flex flex-col gap-2 justify-between">
          {customFieldData.subValue.map((subValue, index) => (
            <Txt key={index}>{`${subValue.title} ${applicantDataFinder(
              data,
              subValue.name
            )}`}</Txt>
          ))}
        </div>
      </div>
    </>
  );
};

export default ApplicantCustomField;
