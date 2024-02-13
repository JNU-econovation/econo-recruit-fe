type KanbanColumnDetailComponentProps = {
  setIsDetailOpen: (isOpen: boolean) => void;
};

const KanbanColumnDetailComponent = ({
  setIsDetailOpen,
}: KanbanColumnDetailComponentProps) => {
  return (
    <div
      className="flex flex-col gap-5 px-6 py-7 bg-white border-[1px] border-light justify-center items-center rounded-xl shadow-[0_2px_4px_0_rgba(0,0,0,0.11)] text-[#666] text-lg absolute -right-[3rem] top-9 z-20"
      onMouseLeave={() => {
        setIsDetailOpen(false);
      }}
    >
      <button type="button">수정</button>
      <button type="button">삭제</button>
    </div>
  );
};

export default KanbanColumnDetailComponent;
