import SortList from "@/components/common/SortList";
import InterviewBoardComponent from "@/components/interview/Board";
import InterviewPageNavbar from "@/components/interview/PageNavbar.component";
import Search from "@/components/common/Search";
import { ORDER_MENU } from "@/src/constants";

interface InterviewPageProps {
  params: {
    generation: string;
  };
}

const InterviewPage = ({ params: { generation } }: InterviewPageProps) => {
  return (
    <div className="flex-1 ml-32 min-w-[46rem]">
      <div className="flex w-full justify-end gap-8 my-12">
        <Search />
        <SortList sortList={ORDER_MENU.INTERVIEW} />
      </div>
      <InterviewBoardComponent />
      <InterviewPageNavbar generation={generation} />
    </div>
  );
};

export default InterviewPage;
