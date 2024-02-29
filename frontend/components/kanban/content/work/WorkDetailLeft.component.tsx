import { useEffect, useState } from "react";
import { Work, deleteWork, putWork } from "@/src/apis/work";
import dynamic from "next/dynamic";
import Txt from "@/components/common/Txt.component";
import WorkLabel from "./Label.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WorkDetailLeftProps {
  cardId: number;
  workTitle: string;
  generation: string;
}

const ApplicantComment = dynamic(
  () =>
    import("@/components/applicant/applicantNode/comment/Comment.component"),
  { ssr: false }
);

const WorkDetailLeft = ({
  workTitle,
  generation,
  cardId,
}: WorkDetailLeftProps) => {
  const [title, setTitle] = useState("");
  const [isOpenAddCard, setIsOpenAddCard] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: changeWorkCardTitle } = useMutation(putWork, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["work", cardId],
      });
    },
  });

  const { mutate: deleteWorkCard } = useMutation(deleteWork, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["work", cardId],
      });
    },
  });

  const addCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeWorkCardTitle({ cardId, title });
    setIsOpenAddCard(false);
  };

  const onDeleteWorkCard = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    deleteWorkCard(`${cardId}`);
  };

  useEffect(() => {
    setTitle(workTitle);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex w-full justify-between items-baseline">
          {isOpenAddCard ? (
            <form className="flex gap-2" onSubmit={(e) => addCardSubmit(e)}>
              <input
                type="text"
                className="font-bold w-full border rounded-lg p-2"
                placeholder="Enter a title for this card"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex text-sm gap-2 text-secondary-200 items-center w-[4rem]">
                <button
                  type="submit"
                  onClick={() => setIsOpenAddCard((prev) => !prev)}
                >
                  수정완료
                </button>
              </div>
            </form>
          ) : (
            <Txt typography="h2">{workTitle}</Txt>
          )}
          <div className="flex gap-2 w-[8rem] justify-end">
            <button
              className="text-sm text-secondary-200 items-center w-fit"
              onClick={() => setIsOpenAddCard((prev) => !prev)}
            >
              수정
            </button>
            <button
              className="text-sm text-secondary-200 items-center w-fit"
              onClick={onDeleteWorkCard}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <WorkLabel cardId={cardId} generation={generation} />
      <ApplicantComment cardId={cardId} postId="" generation={generation} />
    </>
  );
};

export default WorkDetailLeft;
