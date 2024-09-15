import Txt from "@/components/common/Txt.component";
import ApplicantsList from "@/components/passState/ApplicantsList";
import { CURRENT_GENERATION } from "@/src/constants";
import { cn } from "@/src/utils/cn";

export const gridRatio = "grid-cols-[4fr_2fr_2fr_1fr] gap-4";

const PassStatePage = () => {
  return (
    <div className="flex-1 ml-32 min-w-[46rem] mb-12">
      <div className="mt-20" />
      <Txt typography="h3">
        {CURRENT_GENERATION}기 지원자 합격 상태 관리 페이지
      </Txt>
      <div className="mt-8" />

      <div className={cn("grid", gridRatio)}>
        <Txt typography="h6" className="text-left text-secondary-100">
          지원자 이름
        </Txt>
        <Txt typography="h6" className="text-left text-secondary-100">
          분야
        </Txt>
        <Txt typography="h6" className="text-left text-secondary-100">
          합격 상태
        </Txt>
      </div>
      <div className="mt-2" />
      <hr />
      <div className="mt-4" />
      <ApplicantsList />
    </div>
  );
};

export default PassStatePage;
