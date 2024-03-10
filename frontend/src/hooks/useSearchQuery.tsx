import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getSearchKeyword } from "@/src/apis/search";

export const useSearchQuery = (pageIndex: string) => {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const { data: search } = useQuery({
    queryKey: ["searchKeyWord", pageIndex, searchKeyword],
    queryFn: () => getSearchKeyword(+pageIndex, searchKeyword),
    enabled: !!searchKeyword,
  });

  const searchEndPage = search?.endPage;

  const searchInterviewData = search?.answers.map((value) => ({
    id: value.id,
    title: `[${value.field}] ${value.name}`,
    subElements: [
      value.field1.split('"').join(""),
      value.field2.split('"').join(""),
      `${value.grade.split('"').join("")} ${value.semester
        .split('"')
        .join("")}`,
    ],
  }));

  const searchApplicantData = search?.answers.map((value) => ({
    id: value.id,
    title: `[${value.field}] ${value.name}`,
    subElements: [
      value.field1.split('"').join(""),
      value.field2.split('"').join(""),
      `${value.grade.split('"').join("")} ${value.semester
        .split('"')
        .join("")}`,
      new Date(Number(value.uploadDate)).toLocaleString("ko-KR", {
        dateStyle: "short",
      }),
    ],
  }));

  return { searchInterviewData, searchApplicantData, searchEndPage };
};