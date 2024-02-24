import InterviewUserComponent from "./User.component";
import { getInterviewRecord } from "@/src/apis/interview";
import { getScore } from "@/src/apis/score";
import InterviewAvgComponent from "@/components/interview/modal/AvgScore.component";
import InterviewScoreComponent from "./Score.component";
import InterviewEditComponent from "./Edit.component";
import InterviewUploadComponent from "./Upload.component";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";

const InterViewScore = () => {
  const applicantId = useAtomValue(interViewApplicantIdState);
  const {
    data: scoreData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["score", applicantId],
    queryFn: () => getScore(applicantId),
  });

  if (!scoreData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <InterviewAvgComponent
        totalAverage={scoreData.totalAverage}
        average={scoreData.scoreVo.average}
      />
      <InterviewScoreComponent score={scoreData} />
    </>
  );
};

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
      <InterViewScore />
      <InterViewEditorOrUploader />
    </>
  );
};

export default InterviewDetailLeftComponent;
