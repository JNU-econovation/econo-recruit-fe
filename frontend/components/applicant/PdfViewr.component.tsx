"use client";

import ApplicantDetailRight from "@/components/applicant/DetailRight.component";
import { getAppliationById } from "@/src/apis/applicant";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const ApplicationPdfViewer = () => {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("id") || "";

  const { data, isLoading, isError } = useQuery(
    ["applicant", applicantId],
    () => getAppliationById(applicantId),
    {
      enabled: !!applicantId,
    }
  );

  if (!data || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="p-24">
      <ApplicantDetailRight data={data} />
    </div>
  );
};

export default ApplicationPdfViewer;
