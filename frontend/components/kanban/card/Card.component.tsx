import { KanbanCardData } from "@/src/stores/kanban/Kanban.atoms";
import { cn } from "@/src/utils/cn";
import { useParams, useRouter } from "next/navigation";

type KanbanCardComponentType = {
  data: KanbanCardData | null;
  columnIndex: number;
  cardId?: string;
  applicantId?: string;
};

function KanbanCardComponent({
  data,
  columnIndex,
  applicantId,
  cardId,
}: KanbanCardComponentType) {
  const { generation } = useParams();
  const navigate = useRouter();

  if (!data) {
    return <></>;
  }

  const {
    id,
    title,
    apply,
    comment,
    isHearted,
    heart,
    major,
    applicantId: dataApplicantId,
    cardType,
  } = data;

  const onClickDetail = () => {
    navigate.push(
      `/kanban/${generation}/detail?applicantId=${dataApplicantId}&columnIndex=${columnIndex}&type=${cardType}&cardId=${id}`
    );
  };

  const isSelected =
    (applicantId && dataApplicantId === applicantId) ||
    id.toString() === cardId;

  return (
    <div
      className={cn(
        "border-[1px] w-[14.9rem] p-3 rounded-lg drop-shadow-md bg-white hover:border-primary-400",
        isSelected ? "border-primary" : "border-light"
      )}
      onClick={onClickDetail}
    >
      <div className="text-xs text-secondary-200">{major}</div>
      <div className="font-bold truncate">{title}</div>
      <div className="mt-2 flex justify-between items-center text-sm text-secondary-200">
        <div className="text-sm">{apply.join(" / ")}</div>
        <div className="flex gap-3">
          <div className="flex">
            <img src="/icons/bubble.right.svg" alt="comment" />
            {comment}
          </div>
          <div className="flex">
            {isHearted ? (
              <img src="/icons/heart.point.svg" alt="heart" />
            ) : (
              <img src="/icons/heart.svg" alt="heart" />
            )}
            {heart}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanCardComponent;
