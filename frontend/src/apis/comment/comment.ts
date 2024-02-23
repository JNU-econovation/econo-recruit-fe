import { https } from "../../functions/axios";

export interface CommentRes {
  id: string;
  content: string;
  createdAt: string;
  interviewerName: string;
  isLike: boolean;
  likeCount: number;
  canEdit: boolean;
}

export interface CommentReq {
  content: string;
  parentCommentId: number;
  applicantId: string;
  cardId: number;
}

export const getAllComment = async (cardId: number, applicantId: string) => {
  if (cardId <= 0) {
    const { data } = await https.get<CommentRes[]>(
      `/applicants/${applicantId}/comments`
    );
    return data;
  }
  const { data } = await https.get<CommentRes[]>(`/cards/${cardId}/comments`);
  return data;
};

export const postComment = async (body: CommentReq) => {
  if (!(body.applicantId === "" || body.cardId <= 0)) {
    console.log("잘못된 요청입니다.");
  }

  let reqData: unknown = body;
  if (body.applicantId === "") {
    reqData = {
      ...body,
      applicantId: null,
    };
  }
  if (body.cardId <= 0) {
    reqData = {
      ...body,
      cardId: null,
    };
  }
  const { data } = await https.post<string>(`/comments`, reqData);
  return data;
};

export const putComment = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  const { data } = await https.put<string>(`/comments/${commentId}`, {
    content,
  });

  return data;
};

export const deleteComment = async (commentId: string) => {
  const { data } = await https.delete<number>(`/comments/${commentId}`);
  return data;
};

export const getCardsByCardId = async (cardId: string) => {
  const { data } = await https.get<CommentRes[]>(`/cards/${cardId}/comments`);
  return data;
};

export const getCardsByApplicantId = async (applicantId: string) => {
  const { data } = await https.get<CommentRes[]>(
    `/applicants/${applicantId}/comments`
  );
  return data;
};
