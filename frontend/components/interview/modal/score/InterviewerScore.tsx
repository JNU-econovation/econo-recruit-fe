import { FIELD_NAME, Score } from "@/src/constants/applicant/29";

interface InterviewerScoreProps {
  interviewers: {
    [key: string]: Score[];
  };
}

interface InterviewerScoresItemProps {
  name: string;
  scores: Score[];
}

const InterviewerScores = ({ interviewers }: InterviewerScoreProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <InterviewerScoresHeader />
      {Object.entries(interviewers).map(([name, scores]) => (
        <InterviewerScoresItem name={name} scores={scores} />
      ))}
    </div>
  );
};

const InterviewerScoresHeader = () => {
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-12 w-full">
      <div></div>
      <div className="flex w-full justify-between">
        {FIELD_NAME.map((fieldName) => (
          <span className="text-dark w-[4.5rem] text-sm text-center break-keep">
            {fieldName}
          </span>
        ))}
      </div>
    </div>
  );
};

const InterviewerScoresItem = ({
  name,
  scores,
}: InterviewerScoresItemProps) => {
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-12 w-full">
      <div className="w-fit px-4 py-2 bg-primary-200 rounded-3xl">
        <span className="text-primary-500 text-sm font-semibold">{name}</span>
      </div>
      <div className="flex w-full justify-between">
        {scores.map((score) => (
          <span className="text-dark text-lg w-[4.5rem] text-center">
            {score.score}
          </span>
        ))}
      </div>
    </div>
  );
};
export default InterviewerScores;
