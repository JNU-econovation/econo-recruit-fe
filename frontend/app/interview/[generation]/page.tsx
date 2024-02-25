import SortList from "@/components/common/SortList";
import CommonNavbar from "@/components/common/navbar/Navbar.component";
import InterviewBoardComponent from "@/components/interview/Board";
import InterviewPageNavbar from "@/components/interview/PageNavbar.component";
import InterviewSearchComponent from "@/components/interview/Search.component";
import Validate from "@/components/user/Validate.component";
import { ORDER_MENU } from "@/src/constants";

interface InterviewPageProps {
  params: {
    generation: string;
  };
}

const InterviewPage = ({ params: { generation } }: InterviewPageProps) => {
  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <Validate />
      <CommonNavbar generation={generation} />
      <div className="flex-1 ml-32 min-w-[46rem]">
        <div className="flex w-full justify-end gap-8 my-12">
          <InterviewSearchComponent />
          <SortList sortList={ORDER_MENU.INTERVIEW} />
        </div>
        <InterviewBoardComponent />
        <InterviewPageNavbar generation={generation} />
      </div>
    </div>
  );
};

export default InterviewPage;
