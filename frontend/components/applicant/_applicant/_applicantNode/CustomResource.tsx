import { applicantDataFinder } from "@/src/functions/finder";
import Portfolio from "../../applicantNode/Portfolio";
import { ApplicantReq } from "@/src/apis/applicant";
import Txt from "@/components/common/Txt.component";
import { getApplicantPassState } from "@/src/functions/formatter";

interface CustomResourceProps {
  data: ApplicantReq[];
  ableToEdit?: boolean;
  onClickPass?: () => void;
  onClickNonPass?: () => void;
}

const CustomResource = ({
  data,
  ableToEdit = false,
  onClickPass,
  onClickNonPass,
}: CustomResourceProps) => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        <Txt className="text-xl text-secondary-200 font-medium">
          {applicantDataFinder(data, "major")}
        </Txt>
        <div className="flex gap-8 items-center">
          <Txt typography="h2">{`[${applicantDataFinder(
            data,
            "field"
          )}] ${applicantDataFinder(data, "name")}`}</Txt>
          <div className="flex justify-between grow items-center">
            <Txt typography="h5" color="light_gray" className="truncate">
              {getApplicantPassState(applicantDataFinder(data, "passState")) ||
                "에러 발생"}
            </Txt>
            {ableToEdit && (
              <div className="flex gap-4">
                <button
                  className="border rounded-lg px-4 py-2 truncate hover:bg-primary-100"
                  onClick={onClickPass}
                >
                  합격
                </button>
                <button
                  className="border rounded-lg px-4 py-2 truncate hover:bg-primary-100"
                  onClick={onClickNonPass}
                >
                  불합격
                </button>
              </div>
            )}
          </div>
        </div>
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

export default CustomResource;