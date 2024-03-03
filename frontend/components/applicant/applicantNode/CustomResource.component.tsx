import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Portfolio from "./Portfolio";
interface ApplicantResourceProps {
  data: ApplicantReq[];
  postId: string;
}

const ApplicantResource = ({ data, postId }: ApplicantResourceProps) => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        <Txt className="text-xl text-secondary-200 font-medium">
          {applicantDataFinder(data, "major")}
        </Txt>
        <Txt typography="h2">{`[${applicantDataFinder(
          data,
          "field"
        )}] ${applicantDataFinder(data, "name")}`}</Txt>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="flex gap-1">
          <Txt typography="h3" color="gray" className="font-normal">
            1지망:
          </Txt>
          <Txt typography="h3" color="blue">
            {applicantDataFinder(data, "field1")}
          </Txt>
        </div>
        <div className="flex gap-1">
          <Txt typography="h3" color="gray" className="font-normal">
            2지망:
          </Txt>
          <Txt typography="h3" color="blue">
            {applicantDataFinder(data, "field2")}
          </Txt>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Portfolio data={data} />
      </div>
    </>
  );
};

export default ApplicantResource;
