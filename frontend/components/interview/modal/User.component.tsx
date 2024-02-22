import { InterviewRes, getInterviewRecord } from "@/src/apis/interview";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

const InterviewUserComponent = () => {
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
    return (
      <div className="w-full pb-[56.25%] relative h-0">
        <div className="w-full h-full absolute top-0 left-0 bg-gray-200"></div>
      </div>
    );
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="w-full pb-[56.25%] relative h-0">
      <iframe
        src={fetchedRecord.url}
        title=""
        className="w-full h-full absolute top-0 left-0"
      />
    </div>
  );
};
export default InterviewUserComponent;
