import { getAllApplicantsWithPassState } from "@/src/apis/passState";
import { useQuery } from "@tanstack/react-query";

interface ApplicantByIdParams {
  applicantId: string;
  generation: string;
}

export function useApplicantById({
  applicantId,
  generation,
}: ApplicantByIdParams) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allApplicantsWithPassState", generation],
    queryFn: () => getAllApplicantsWithPassState(generation),
  });

  const applicant =
    data && applicantId
      ? data.find((item) => item.id === applicantId)
      : data || [];

  return { applicant, isLoading, isError };
}
