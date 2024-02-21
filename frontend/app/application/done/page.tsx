import { CURRENT_GENERATION } from "@/src/constants";
import Image from "next/image";
import Link from "next/link";

interface ApplicantDonePageProps {
  searchParams: {
    id?: string;
  };
}

const ApplicationDonePage = ({
  searchParams: { id },
}: ApplicantDonePageProps) => {
  const generation = `${CURRENT_GENERATION}`;

  const endDate =
    require(`@/src/constants/application/${generation}.ts`).END_DATE;

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen gap-6 absolute top-0 left-0">
      <Image
        src={require("/public/images/econo-3d-logo.png").default}
        alt="econo-3d-logo"
      />
      <h1 className="font-extrabold text-4xl">신입모집 지원 완료!</h1>
      <div className="text-center flex flex-col gap-1 text-lg">
        <div>
          에코노베이션 {CURRENT_GENERATION}기 지원서가 정상적으로 업로드
          되었습니다
        </div>
        <div>
          서류 합격 결과는 {endDate.month}월 {endDate.date}일에 개인 메일으로
          공지 될 예정입니다.
        </div>
        <div>
          <Link
            className="text-blue-500 hover:underline font-bold"
            href={
              "https://recruit.econovation.kr/applicant/pdf-viewer?id=" +
              (id ?? "")
            }
          >
            여기
          </Link>
          에서 지원서를 확인하실 수 있습니다.
        </div>
        <div>지원해주셔서 감사합니다.</div>
      </div>
    </section>
  );
};

export default ApplicationDonePage;
