"use client";

import ApplicantCommentInputForm from "./InputForm.component";
import { useQuery } from "@tanstack/react-query";
import { getAllComment } from "@/src/apis/comment";
import ApplicantCommentDetail from "./CommentDetail.component";

interface ApplicantCommentProps {
  postId: string;
  cardId: number;
  generation: string;
}

const ApplicantComment = ({
  postId,
  cardId,
  generation,
}: ApplicantCommentProps) => {
  const { data, error, isLoading } = useQuery(
    ["applicantComment", "", cardId],
    () => getAllComment(cardId, postId)
  );

  if (!data || isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <ApplicantCommentInputForm
        applicantId={postId}
        cardId={cardId}
        commentLength={data.length}
        generation={generation}
      />
      <div className="flex flex-col gap-8 pt-8">
        {data.map((comment) => (
          <ApplicantCommentDetail
            generation={generation}
            comment={comment}
            cardId={cardId}
            key={comment.id}
          />
        ))}
      </div>
    </>
  );
};

export default ApplicantComment;
