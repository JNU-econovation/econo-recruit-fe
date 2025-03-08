import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Portfolio from "./Portfolio";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CardApplicantStatusLabel from "@/components/common/CardApplicantStatusLabel";
import { useAtomValue } from "jotai";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { getMyInfo } from "@/src/apis/interview";
import { findApplicantState } from "@/src/utils/applicant";
import { ApplicantPassState, getKanbanCards } from "@/src/apis/kanban";
import {
  patchApplicantPassState,
  PatchApplicantPassStateParams,
} from "@/src/apis/passState";
import { useOptimisticApplicantPassUpdate } from "@/src/hooks/applicant/useOptimisticApplicantPassUpdate";

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
  const navbarId = useAtomValue(KanbanSelectedButtonNumberState);
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("applicantId");

  // 아래 초기 합/불 내가 만든 훅으로 변경

  const {
    data: initialState,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applicantState", applicantId, navbarId],
    queryFn: async () =>
      findApplicantState(
        await getKanbanCards(navbarId, generation),
        `${applicantId}`
      ),
    staleTime: 3000,
  });

  const {
    data: myInfo,
    isLoading: myInfoLoading,
    isError: myInfoError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMyInfo,
  });
  const { mutate: updateApplicantPassState } = useOptimisticApplicantPassUpdate(
    generation,
    postId
  );

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

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex justify-between items-center">
            <Txt className="text-xl text-secondary-200 font-medium">
              {applicantDataFinder(data, "major")}
            </Txt>
            <CardApplicantStatusLabel passState={initialState} />
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
              onClick={onClickPass}
              className="bg-zinc-200 w-20 h-20 hover:bg-sky-400 rounded-xl"
            >
              합격
            </button>
            <button
              onClick={onClickNonPass}
              className="bg-zinc-200 w-20 h-20 hover:bg-sky-400 rounded-xl"
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
