"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApplicantCommentEditorOrViewer from "./EditorOrViewer.component";
import { deleteComment } from "../../../../src/apis/comment/comment";
import { postCommentsLike } from "@/src/apis/comment/commentLike";

interface CommentDeleteButtonProps {
  commentId: string;
  cardId: number;
  generation: string;
}

const CommentDeleteButton = ({
  commentId,
  cardId,
  generation,
}: CommentDeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation(() => deleteComment(commentId), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicantComment", "", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", generation],
      });
    },
  });

  return <button onClick={() => onDelete()}>삭제</button>;
};

interface ApplicantCommentReq {
  id: string;
  content: string;
  createdAt: string;
  interviewerName: string;
  isLike: boolean;
  likeCount: number;
  canEdit: boolean;
}

interface ApplicantCommentDetailProps {
  comment: ApplicantCommentReq;
  cardId: number;
  generation: string;
}

const ApplicantCommentDetail = ({
  comment,
  generation,
  cardId,
}: ApplicantCommentDetailProps) => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: heartToggle } = useMutation(
    () => postCommentsLike(comment.id),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["applicantComment", "", cardId],
        });
      },
    }
  );

  return (
    <div className="border-l-4 border-[#717171] pl-3">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 items-end">
          <div>{comment.interviewerName}</div>
          <div className="text-xs">
            {new Date(+comment.createdAt).toLocaleDateString()}
          </div>
        </div>
        <button onClick={() => heartToggle()} className="flex gap-2 items-end">
          <img
            src={
              comment.isLike
                ? "/icons/face.smiling.fill.svg"
                : "/icons/face.smiling.svg"
            }
            alt="smile face"
          />
          <span className="text-xs text-[#808080]">{comment.likeCount}</span>
        </button>
      </div>
      <ApplicantCommentEditorOrViewer
        isEdit={isEdit}
        content={comment.content}
        commentId={comment.id}
        setIsEdit={setIsEdit}
      />
      {comment.canEdit && (
        <div className="flex text-sm gap-2 text-[#666666] items-center">
          <button onClick={() => setIsEdit((prev) => !prev)}>수정</button>
          <div className="border-x-[0.5px] h-4 !w-0 border-[#666666]"></div>
          <CommentDeleteButton
            commentId={comment.id}
            cardId={cardId}
            generation={generation}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicantCommentDetail;
