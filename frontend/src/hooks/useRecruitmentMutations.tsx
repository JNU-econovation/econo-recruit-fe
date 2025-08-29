import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postRecruitmentTime,
  deleteRecruitmentTime,
  RecruitmentTime,
} from "@/src/apis/recruitment";

export const useRecruitmentMutations = () => {
  const queryClient = useQueryClient();

  const createRecruitmentMutation = useMutation({
    mutationFn: postRecruitmentTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentTime"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.status === 500
          ? "500 에러(백엔드에게 문의 바람)"
          : error?.message || "모집 시간 등록에 실패했습니다.";
      alert(errorMessage);
    },
  });

  const deleteRecruitmentMutation = useMutation({
    mutationFn: deleteRecruitmentTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentTime"] });
      alert("모집이 취소되었습니다.");
    },
    onError: () => {
      alert("모집 취소에 실패했습니다.");
    },
  });

  const handleCreateRecruitment = (data: RecruitmentTime) => {
    createRecruitmentMutation.mutate(data);
  };

  const handleDeleteRecruitment = (recruitmentId: string) => {
    deleteRecruitmentMutation.mutate(recruitmentId);
  };

  return {
    createRecruitmentMutation,
    deleteRecruitmentMutation,
    handleCreateRecruitment,
    handleDeleteRecruitment,
  };
};
