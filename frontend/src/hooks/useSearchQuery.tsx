import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getSearchTerm } from "@/src/apis/search";

export const useSearchQuery = (pageIndex: string) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { data: search } = useQuery({
    queryKey: ["searchTerm", pageIndex, searchTerm],
    queryFn: () => getSearchTerm({ page: +pageIndex, searchTerm }),
    enabled: !!searchTerm,
  });

  const searchEndPage = search?.endPage;

  const createSearchData = (isIncludeUploadDate = false) => {
    return search?.answers?.map((value) => {
      const searchInterviewData = {
        id: value.id,
        title: `[${value.field}] ${value.name}`,
        subElements: [
          value.field1.split('"').join(""),
          value.field2.split('"').join(""),
          `${value.grade.split('"').join("")} ${value.semester
            .split('"')
            .join("")}`,
        ],
      };

      if (isIncludeUploadDate) {
        searchInterviewData.subElements.push(
          new Date(Number(value.uploadDate)).toLocaleString("ko-KR", {
            dateStyle: "short",
          })
        );
      }

      return searchInterviewData;
    });
  };

  return { createSearchData, searchEndPage };
};
