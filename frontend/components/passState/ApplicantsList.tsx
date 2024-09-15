"use client";

import { gridRatio } from "@/app/(WithNavbar)/pass-state/[generation]/page";
import {
  useAllApplicantsWithPassState,
  usePostApplicantPassState,
} from "@/src/apis/passState";
import { CURRENT_GENERATION } from "@/src/constants";
import { cn } from "@/src/utils/cn";
import { usePathname } from "next/navigation";
import Txt from "../common/Txt.component";
import { ApplicantPassState } from "@/src/apis/kanban";

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

const ApplicantsList = () => {
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

  const { answers: applicants } = allApplicants;

  return (
    <ul className="flex flex-col gap-4">
      {applicants.map(
        ({ state: { passState }, field, field1, field2, id, name }) => (
          <li key={id} className={cn("grid items-center ", gridRatio)}>
            <Txt typography="h6" className="text-left truncate">
              {`[${field}] ${name}`}
            </Txt>
            <Txt className="text-left truncate">{`${field1}/${field2}`}</Txt>
            <Txt className="text-left truncate">
              {getApplicantPassState(passState)}
            </Txt>
            <div className="flex justify-between">
              <button
                className="border px-4 py-2 rounded-lg hover:bg-primary-100"
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
                className="border px-4 rounded-lg hover:bg-primary-100"
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
