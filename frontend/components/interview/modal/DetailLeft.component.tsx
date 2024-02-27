import InterviewUserComponent from "./User.component";
import { getInterviewRecord } from "@/src/apis/interview";
import InterviewEditComponent from "./Edit.component";
import InterviewUploadComponent from "./Upload.component";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import InterviewScore from "./score/InterviewScore";

const InterViewEditorOrUploader = () => {
  const applicantId = useAtomValue(interViewApplicantIdState);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["record", applicantId],
    queryFn: () => getInterviewRecord(applicantId),
  });

  if (!data || isLoading || isError) {
    return <InterviewUploadComponent />;
  }

  return <InterviewEditComponent data={data} />;
};

const InterviewDetailLeftComponent = () => {
  return (
    <>
      <InterviewUserComponent />
      <InterviewScore />
      <InterViewEditorOrUploader />
    </>
  );
};

export default InterviewDetailLeftComponent;
