import ApplicantBoard from "@/components/applicant/Board";
import ApplicantPageNavbar from "@/components/applicant/PageNavbar.component";
import ApplicantSearch from "@/components/applicant/Search.component";
import SortList from "@/components/common/SortList";
import CommonNavbar from "@/components/common/navbar/Navbar.component";
import Validate from "@/components/user/Validate.component";
import { ORDER_MENU } from "@/src/constants";

interface ApplicantPageProps {
  params: {
    generation: string;
  };
}

const ApplicantPage = ({ params }: ApplicantPageProps) => {
  const { generation } = params;
  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <Validate />
      <CommonNavbar generation={generation} />
      <div className="flex-1 ml-32 min-w-[46rem]">
        <div className="flex w-full justify-end gap-8 my-12">
          <ApplicantSearch />
          <SortList sortList={ORDER_MENU.APPLICANT} />
        </div>
        <ApplicantBoard generation={generation} />
        <ApplicantPageNavbar generation={generation} />
      </div>
    </div>
  );
};

export default ApplicantPage;
