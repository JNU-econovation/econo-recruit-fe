import InterviewBoardComponent from "@/components/interview/Board.component";
import InterviewPageNavbar from "@/components/interview/PageNavbar.component";
import InterviewSearchComponent from "@/components/interview/Search.component";
import InterviewSortList from "@/components/interview/SortList.component";

interface InterviewPageProps {
  params: {
    generation: string;
  };
}

const InterviewPage = ({ params: { generation } }: InterviewPageProps) => {
  return (
    <div className="flex-1 ml-32 min-w-[46rem]">
      <div className="flex w-full justify-end gap-8 my-12">
        <InterviewSearchComponent />
        <InterviewSortList />
      </div>
      <InterviewBoardComponent />
      <InterviewPageNavbar generation={generation} />
    </div>
  );
};

export default InterviewPage;
