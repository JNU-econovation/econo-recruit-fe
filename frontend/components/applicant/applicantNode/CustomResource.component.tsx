import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Portfolio from "./Portfolio";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CardApplicantStatusLabel from "@/components/common/CardApplicantStatusLabel";

import { getMyInfo } from "@/src/apis/interview";

import { useOptimisticApplicantPassUpdate } from "@/src/hooks/applicant/useOptimisticApplicantPassUpdate";
import { useApplicantById } from "@/src/hooks/applicant/useApplicantById";
import { getPassState } from "@/src/functions/passState";
import { cn } from "@/src/utils/cn";

interface ApplicantResourceProps {
  data: ApplicantReq[];
  postId: string;
  generation: string;
}

const ApplicantResource = ({
  data,
  postId,
  generation,
}: ApplicantResourceProps) => {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("applicantId") ?? "";

  const {
    applicant: initialState,
    isLoading,
    isError,
  } = useApplicantById({ applicantId, generation });

  const {
    data: myInfo,
    isLoading: myInfoLoading,
    isError: myInfoError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMyInfo,
  });
  const { mutate: updateApplicantPassState } =
    useOptimisticApplicantPassUpdate(generation);

  const onClickPass = () => {
    const ok = confirm("합격 처리하시겠습니까?");
    if (!ok) return;
    updateApplicantPassState({
      applicantId: postId,
      afterState: "pass",
    });
  };

  const onClickNonPass = () => {
    const ok = confirm("불합격 처리하시겠습니까?");
    if (!ok) return;
    updateApplicantPassState({
      applicantId: postId,
      afterState: "non-pass",
    });
  };

  if (!initialState || isLoading || !myInfo || myInfoLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || myInfoError) {
    return <div>에러 발생</div>;
  }

  const passState = getPassState(initialState);

  const isPass = passState === "first-passed" || passState === "final-passed";
  const isNonPass = passState === "non-passed";

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex justify-between items-center">
            <Txt className="text-xl text-secondary-200 font-medium">
              {applicantDataFinder(data, "major")}
            </Txt>
            <CardApplicantStatusLabel passState={passState} />
          </div>
          <Txt typography="h2">{`[${applicantDataFinder(
            data,
            "field"
          )}] ${applicantDataFinder(data, "name")}`}</Txt>
        </div>
        {(myInfo.role === "ROLE_OPERATION" ||
          myInfo.role === "ROLE_PRESIDENT") && (
          <div className="flex gap-5">
            <button
              disabled={isPass}
              onClick={onClickPass}
              className="w-20 h-20 bg-zinc-200 hover:bg-sky-400 rounded-xl disabled:bg-zinc-200 disabled:cursor-not-allowed"
            >
              합격
            </button>
            <button
              disabled={isNonPass}
              onClick={onClickNonPass}
              className="w-20 h-20 bg-zinc-200 hover:bg-sky-400 rounded-xl disabled:bg-zinc-200 disabled:cursor-not-allowed"
            >
              불합격
            </button>
          </div>
        )}
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
