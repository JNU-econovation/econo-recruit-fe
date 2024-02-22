import ApplicantBoard from "@/components/applicant/Board.component";
import ApplicantPageNavbar from "@/components/applicant/PageNavbar.component";
import ApplicantSearch from "@/components/applicant/Search.component";
import ApplicantSortList from "@/components/applicant/SortList.component";
import CommonNavbar from "@/components/common/navbar/Navbar.component";
interface ApplicantPageProps {
  params: {
    generation: string;
  };
}

const ApplicantPage = ({ params }: ApplicantPageProps) => {
  const { generation } = params;
  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <CommonNavbar generation={generation} />
      <div className="flex-1 ml-32 min-w-[46rem]">
        <div className="flex w-full justify-end gap-8 my-12">
          <ApplicantSearch />
          <ApplicantSortList />
        </div>
        <ApplicantBoard generation={generation} />
        <ApplicantPageNavbar generation={generation} />
      </div>
    </div>
  );
};

export default ApplicantPage;
