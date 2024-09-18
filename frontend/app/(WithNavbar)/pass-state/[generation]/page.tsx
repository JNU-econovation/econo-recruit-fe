import Txt from "@/components/common/Txt.component";
import ApplicantsList from "@/components/passState/ApplicantsList";
import { CURRENT_GENERATION } from "@/src/constants";
import Image from "next/image";
import Link from "next/link";

interface PassStatePageProps {
  searchParams: {
    sortedBy?: "field";
  };
}

const PassStatePage = ({ searchParams: { sortedBy } }: PassStatePageProps) => {
  return (
    <div className="flex-1 ml-32 min-w-[46rem] mb-12">
      <div className="mt-20" />
      <Txt typography="h3">
        {CURRENT_GENERATION}기 지원자 합격 상태 관리 페이지
      </Txt>
      <div className="mt-8" />
      {sortedBy === "field" && (
        <Link href={`/pass-state/${CURRENT_GENERATION}`}>
          <Txt typography="h5" className="text-secondary-200">
            현재 분야별로 정렬되어 있습니다. (WEB - APP - AI - GAME)
          </Txt>
          <div className="mt-8" />
        </Link>
      )}
      <div className="grid grid-cols-[8fr_8fr_4fr_3fr] gap-4">
        <Txt typography="h6" className="text-left text-secondary-100">
          지원자 이름
        </Txt>
        <Link
          href={`/pass-state/${CURRENT_GENERATION}?${new URLSearchParams(
            "sortedBy=field"
          )}`}
          className="text-start flex justify-between pr-4 items-center"
        >
          <Txt typography="h6" className="text-left text-secondary-100">
            분야
          </Txt>
          <Image
            src={"/icons/chevron-down.svg"}
            alt="sort by field"
            width={16}
            height={16}
          />
        </Link>
        <Txt typography="h6" className="text-left text-secondary-100">
          합격 상태
        </Txt>
      </div>
      <div className="mt-2" />
      <hr />
      <div className="mt-4" />
      <ApplicantsList sortedBy={sortedBy} />
    </div>
  );
};

export default PassStatePage;
