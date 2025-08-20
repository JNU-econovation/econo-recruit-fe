import { RecruitmentResponse } from "@/src/apis/recruitment";

/**
 * 현재 활성화된 모집을 찾기
 */
export const findCurrentRecruitment = (
  recruitments: RecruitmentResponse[]
): RecruitmentResponse | undefined => {
  return recruitments.find(
    (r) => r.states === "ACTIVE" || r.states === "NON_START"
  );
};

/**
 * 종료된 모집들을 필터
 */
export const filterPreviousRecruitments = (
  recruitments: RecruitmentResponse[]
): RecruitmentResponse[] => {
  return recruitments.filter((r) => r.states === "END");
};

/**
 * 날짜 문자열을 timestamp로 변환하는 함수
 */
export const convertDateToTimestamp = (dateString: string): number => {
  return new Date(dateString).getTime();
};

/**
 * 폼 데이터 검증
 */
export const validateRecruitmentForm = (
  year: string,
  startDate: string,
  endDate: string
): { isValid: boolean; errorMessage?: string } => {
  if (!year || !startDate || !endDate) {
    return { isValid: false, errorMessage: "모든 필드를 입력해주세요." };
  }

  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 1900 || yearNum > 3000) {
    return { isValid: false, errorMessage: "올바른 년도를 입력해주세요." };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return {
      isValid: false,
      errorMessage: "종료일은 시작일보다 늦어야 합니다.",
    };
  }

  return { isValid: true };
};

/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export const formatDateToKorean = (date: string | Date): string => {
  return new Date(date).toLocaleString("ko-KR");
};

/**
 * 날짜를 한국어 날짜만 표시 (시간 제외)
 */
export const formatDateOnlyToKorean = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("ko-KR");
};

/**
 * 년도만 추출
 */
export const extractYear = (date: string | Date): number => {
  return new Date(date).getFullYear();
};
