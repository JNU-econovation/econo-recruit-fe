import { ApplicantPassState } from "../apis/kanban";
import { ApplicantPartialRes } from "../hooks/applicant/useOptimisticApplicantPassUpdate";

export const getPassState = (
  applicant: ApplicantPartialRes | ApplicantPartialRes[] | null
): ApplicantPassState => {
  if (applicant && !Array.isArray(applicant)) {
    return applicant.state.passState;
  }
  return "non-processed";
};
