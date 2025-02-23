"use client";

import InterviewDetailLeftComponent from "./modal/DetailLeft.component";
import InterviewDetailRightComponent from "./modal/DetailRight.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { useSearchParams } from "next/navigation";
import { getInterviewRecordByPageWithOrder } from "@/src/apis/interview";
import { CHARACTERS, ORDER_MENU } from "@/src/constants";
import { removeAll } from "@/src/functions/replacer";
import BoardTable from "../common/board/BoardTable";
import useModalState from "../../src/hooks/useModalState";
import BoardModal from "../common/board/BoardModal";

interface InterviewBoardProps {
  generation: string;
}

const InterviewBoard = ({ generation }: InterviewBoardProps) => {
  const [applicantId, setApplicantId] = useAtom(interViewApplicantIdState);
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("search") || undefined;
  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") || ORDER_MENU.INTERVIEW[0].type;

  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModalState();

  const onClick = (id: string) => {
    setApplicantId(id);
    queryClient.invalidateQueries({
      queryKey: ["record", applicantId],
    });
    queryClient.invalidateQueries({
      queryKey: ["score", applicantId],
    });
  };

  const { data, status } = useQuery({
    queryKey: [
      "allInterviewRecord",
      { pageIndex, order, generation, searchKeyword },
    ],
    queryFn: () =>
      getInterviewRecordByPageWithOrder({
        page: +pageIndex,
        order: order,
        year: generation,
        searchKeyword,
      }),
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (status === "error") {
    return <div>에러가 발생하였습니다. 잠시 후 다시 시도해보세요.</div>;
  }

  const boardData = data.records.map((value) => {
    return {
      id: value.applicantId,
      title: value.name,
      subElements: [
        removeAll(value.field1, CHARACTERS.DOUBLE_QUOTE).concat(
          CHARACTERS.SLASH,
          removeAll(value.field2, CHARACTERS.DOUBLE_QUOTE)
        ),
        removeAll(value.grade, CHARACTERS.DOUBLE_QUOTE).concat(
          CHARACTERS.SPACE,
          removeAll(value.semester, CHARACTERS.DOUBLE_QUOTE)
        ),
      ],
      passState: value.state.passState,
    };
  });

  const handleModalOpen = (id: string) => () => {
    openModal();
    onClick && onClick(id);
  };

  return (
    <>
      <BoardTable boardRows={boardData} handleModalOpen={handleModalOpen} />
      <BoardModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        wrapperClassName="divide-x"
      >
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-auto px-12">
            <InterviewDetailLeftComponent />
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-auto px-12">
            <InterviewDetailRightComponent />
          </div>
        </div>
      </BoardModal>
    </>
  );
};

export default InterviewBoard;
