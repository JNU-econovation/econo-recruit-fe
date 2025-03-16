import { ScoreKeyword } from "@/src/constants/applicant/29";

interface ScoreInputProps {
  fieldName: ScoreKeyword;
  score: number | "";
  onChangeScore: (fieldName: ScoreKeyword, score: number) => void;
}

const ScoreInput = ({ fieldName, score, onChangeScore }: ScoreInputProps) => {
  return (
    <div className="w-[4.5rem] flex flex-col gap-2 items-center">
      <input
        className="text-dark text-3xl font-semibold w-[60%] text-center outline-none border-b-4 border-primary-200 focus:border-primary-300 transition-colors duration-200 ease-in-out"
        value={score}
        onChange={(e) => onChangeScore(fieldName, parseInt(e.target.value))}
      />
      <span className="text-dark text-center text-sm break-keep">
        {fieldName}
      </span>
    </div>
  );
};

export default ScoreInput;
