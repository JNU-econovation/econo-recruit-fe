import { getAllApplicantsWithPassState } from "@/src/apis/passState";
import { useQuery } from "@tanstack/react-query";

interface ApplicantByIdParams {
  applicantId?: string | null;
  generation: string;
}

export function useApplicantById({
  applicantId,
  generation,
}: ApplicantByIdParams) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allApplicantsWithPassState", generation],
    queryFn: () => getAllApplicantsWithPassState(generation),
    staleTime: 3000,
  });

  const applicant = applicantId
    ? data?.find((item) => item.id === applicantId) || null
    : data || [];

  return { applicant, isLoading, isError };
}
