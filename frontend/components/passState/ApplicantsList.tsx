"use client";

import { getAllApplicantsWithPassState } from "@/src/apis/passState";
import { CURRENT_GENERATION } from "@/src/constants";
import { usePathname } from "next/navigation";
import Txt from "../common/Txt.component";
import { getApplicantPassState } from "@/src/functions/formatter";
import { useQuery } from "@tanstack/react-query";
import type {
  PatchApplicantPassStateParams,
  Answer,
} from "@/src/apis/passState";
import { useOptimisticApplicantPassUpdate } from "@/src/hooks/applicant/useOptimisticApplicantPassUpdate";

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
    if (
      passStateOrder[a.state.passState] !== passStateOrder[b.state.passState]
    ) {
      return (
        passStateOrder[a.state.passState] - passStateOrder[b.state.passState]
      );
    }
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
  } = useQuery(["allApplicantsWithPassState", selectedGeneration], () =>
    getAllApplicantsWithPassState(selectedGeneration)
  );

  const {
    mutate: updateApplicantPassState,
    // isLoading: isUpdatingApplicantPassState,
  } = useOptimisticApplicantPassUpdate(selectedGeneration);

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

  const onChangeApplicantsPassState = (
    applicantName: string,
    params: PatchApplicantPassStateParams
  ) => {
    const ok = confirm(
      `${applicantName}님을 ${params.afterState} 처리하시겠습니까?`
    );
    if (!ok) return;
    updateApplicantPassState(params);
  };

  const applicants =
    sortedBy === "field"
      ? sortApplicantsByField1(allApplicants)
      : allApplicants;

  return (
    <ul className="flex flex-col gap-4">
      {applicants.map(
        ({ state: { passState }, field, field1, field2, id, name }) => (
          <li
            key={id}
            className="grid grid-cols-[8fr_8fr_4fr_3fr] gap-4 items-center"
          >
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
                passState === "non-passed"
                  ? "red"
                  : passState === "final-passed"
                  ? "blue"
                  : "black"
              }
            >
              {getApplicantPassState(passState)}
            </Txt>
            <div className="flex justify-between">
              <button
                disabled={
                  passState === "final-passed" || passState === "first-passed"
                }
                className={`${
                  passState === "final-passed" ||
                  (passState === "first-passed" &&
                    "disabled:bg-primary-100 disabled:cursor-not-allowed ")
                } border px-4 py-2 rounded-lg truncate hover:bg-primary-100`}
                onClick={() =>
                  onChangeApplicantsPassState(name, {
                    applicantId: id,
                    afterState: "pass",
                  })
                }
              >
                합격
              </button>
              <button
                disabled={passState === "non-passed"}
                className={`${
                  passState === "non-passed" &&
                  "disabled:bg-primary-100 disabled:cursor-not-allowed "
                } border px-4 rounded-lg truncate hover:bg-primary-100`}
                onClick={() =>
                  onChangeApplicantsPassState(name, {
                    applicantId: id,
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
