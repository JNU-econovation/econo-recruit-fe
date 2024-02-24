import { InterviewRes, getInterviewRecord } from "@/src/apis/interview";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

const InterviewDetailRightComponent = () => {
  const applicantId = useAtomValue(interViewApplicantIdState);

  const {
    data: fetchedRecord,
    isError,
    isLoading,
  } = useQuery<InterviewRes>({
    queryKey: ["record", applicantId],
    queryFn: () => getInterviewRecord(applicantId),
    enabled: !!applicantId,
  });

  if (!fetchedRecord || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <pre className="whitespace-pre-wrap">{fetchedRecord.record}</pre>
    </>
  );
};

export default InterviewDetailRightComponent;
