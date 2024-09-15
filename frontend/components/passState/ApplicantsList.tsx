"use client";

import { gridRatio } from "@/app/(WithNavbar)/pass-state/[generation]/page";
import {
  Answer,
  useAllApplicantsWithPassState,
  usePostApplicantPassState,
} from "@/src/apis/passState";
import { CURRENT_GENERATION } from "@/src/constants";
import { cn } from "@/src/utils/cn";
import { usePathname } from "next/navigation";
import Txt from "../common/Txt.component";
import { ApplicantPassState } from "@/src/apis/kanban";

// TODO: 함수 util 등으로 빼기
function getApplicantPassState(passState: ApplicantPassState) {
  switch (passState) {
    case "non-processed":
      return "처리중";
    case "first-passed":
      return "1차 합격";
    case "final-passed":
      return "최종 합격";
    case "non-passed":
      return "탈락";
  }
}

function sortApplicantsByField1(applicants: Answer[]) {
  const passStateOrder = {
    "final-passed": 0,
    "first-passed": 1,
    "non-passed": 2,
    "non-processed": 3,
  };

  const field1Order = {
    WEB: 0,
    APP: 1,
    AI: 2,
    GAME: 3,
  };

  return applicants.sort((a, b) => {
    // 먼저 passState에 따라 정렬
    if (
      passStateOrder[a.state.passState] !== passStateOrder[b.state.passState]
    ) {
      return (
        passStateOrder[a.state.passState] - passStateOrder[b.state.passState]
      );
    }

    // passState가 같다면 field1에 따라 정렬
    return field1Order[a.field1] - field1Order[b.field1];
  });
}

interface ApplicantsListProps {
  sortedBy?: "position" | "field";
}
const ApplicantsList = ({ sortedBy }: ApplicantsListProps) => {
  const selectedGeneration = usePathname().split("/")[2];

  const {
    data: allApplicants,
    isLoading,
    isError,
  } = useAllApplicantsWithPassState({
    generation: `${CURRENT_GENERATION}`,
  });
  const { mutate: updateApplicantPassState } = usePostApplicantPassState({
    generation: `${CURRENT_GENERATION}`,
  });

  {
    if (+selectedGeneration !== CURRENT_GENERATION) {
      return <div>현재 지원중인 기수만 확인 가능합니다.</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    if (!allApplicants) {
      return <div>아직은 지원자가 없습니다 🥲</div>;
    }
  }

  const onChangeapplicantsPassState = (
    applicantName: string,
    params: {
      applicantsId: string;
      afterState: "pass" | "non-pass";
    }
  ) => {
    const ok = confirm(
      `${applicantName}님을 ${params.afterState} 처리하시겠습니까?`
    );
    if (!ok) return;
    updateApplicantPassState(params);
  };

  let { answers: applicants } = allApplicants;

  if (sortedBy === "field") applicants = sortApplicantsByField1(applicants);

  return (
    <ul className="flex flex-col gap-4">
      {applicants.map(
        ({ state: { passState }, field, field1, field2, id, name }) => (
          <li key={id} className={cn("grid items-center ", gridRatio)}>
            <Txt typography="h6" className="text-left truncate">
              {`[${field}] ${name}`}
            </Txt>
            <Txt
              className="text-left truncate"
              color="gray"
            >{`${field1}/${field2}`}</Txt>
            <Txt
              className="text-left truncate"
              color={
                getApplicantPassState(passState) === "최종 합격"
                  ? "blue"
                  : getApplicantPassState(passState) === "탈락"
                  ? "red"
                  : "gray"
              }
            >
              {getApplicantPassState(passState)}
            </Txt>
            <div className="flex justify-between">
              <button
                className="border px-4 py-2 rounded-lg truncate hover:bg-primary-100"
                onClick={() =>
                  onChangeapplicantsPassState(name, {
                    applicantsId: id,
                    afterState: "pass",
                  })
                }
              >
                합격
              </button>
              <button
                className="border px-4 rounded-lg truncate hover:bg-primary-100"
                onClick={() =>
                  onChangeapplicantsPassState(name, {
                    applicantsId: id,
                    afterState: "non-pass",
                  })
                }
              >
                불합격
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default ApplicantsList;
