import KanbanBoardDragDropComponent from "@/components/kanban/DragDrop.component";
import KanbanNavbarComponent from "@/components/kanban/Navbar.component";
import CommonNavbar from "@/components/common/navbar/Navbar.component";

interface KanbanBoardPageProps {
  params: {
    generation: string;
  };
}

const KanbanBoardPage = ({ params }: KanbanBoardPageProps) => {
  const { generation } = params;
  return (
    <main className="pl-24 flex py-12">
      <CommonNavbar generation={generation} isShort />
      <div className="ml-32 overflow-auto w-full">
        <div className="w-full pt-12 pb-6 text-3xl font-bold border-b-4">
          {generation}기 신입모집
        </div>
        <div className="flex gap-4 py-6 font-medium overflow-auto">
          <KanbanNavbarComponent />
        </div>
        <div className="overflow-auto max-h-[calc(100vh-16rem)]">
          <KanbanBoardDragDropComponent generation={generation} />
        </div>
      </div>
    </main>
  );
};

export default KanbanBoardPage;
