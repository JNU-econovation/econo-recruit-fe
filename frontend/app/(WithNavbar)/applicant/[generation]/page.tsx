import SortList from "@/components/common/SortList";
import Search from "@/components/common/Search";
import { ORDER_MENU } from "@/src/constants";
import ApplicantList from "@/components/applicant/ApplicantList";

interface ApplicantPageProps {
  params: {
    generation: string;
  };
}

const ApplicantPage = ({ params }: ApplicantPageProps) => {
  const { generation } = params;

  return (
    <div className="flex-1 ml-32 min-w-[46rem]">
      <div className="flex w-full justify-end gap-8 my-12">
        <Search />
        <SortList sortList={ORDER_MENU.APPLICANT} />
      </div>
      <ApplicantList generation={generation} />
    </div>
  );
};

export default ApplicantPage;
