import { getAllApplicantsWithPassState } from "@/src/apis/passState";
import { useQuery } from "@tanstack/react-query";

import { usePathname } from "next/navigation";

export function useApplicantById(userId?: string | null) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment.length > 0);
  const generation = segments[segments.length - 1];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allApplicantsWithPassState", generation],
    queryFn: () => getAllApplicantsWithPassState(generation),
    staleTime: 3000,
  });

  const applicant = userId
    ? data?.find((item) => item.id === userId) || null
    : data || [];

  return { applicant, isLoading, isError };
}
