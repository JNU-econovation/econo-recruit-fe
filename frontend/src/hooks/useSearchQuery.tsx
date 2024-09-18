import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getSearchTerm } from "@/src/apis/search";
import { removeAll } from "../functions/replacer";
import { CHARACTERS } from "@/src/constants";

const { DOUBLE_QUOTE, SLASH, SPACE } = CHARACTERS;

export const useSearchQuery = (pageIndex: string) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { data: search } = useQuery({
    queryKey: ["searchTerm", pageIndex, searchTerm],
    queryFn: () => getSearchTerm({ page: +pageIndex, searchTerm }),
    enabled: !!searchTerm,
  });

  const searchEndPage = search?.endPage;

  // TODO: Search는 대대적인 개편이 들어갈 예정이라, 따로 passState에 대한 처리를 하지 않음.
  const createSearchData = (isIncludeUploadDate = false) => {
    return search?.answers?.map((value) => {
      const searchInterviewData = {
        id: value.id,
        title: `[${value.field}] ${value.name}`,
        subElements: [
          removeAll(value.field1, DOUBLE_QUOTE).concat(
            SLASH,
            removeAll(value.field2, DOUBLE_QUOTE)
          ),
          removeAll(value.grade, DOUBLE_QUOTE).concat(
            SPACE,
            removeAll(value.semester, DOUBLE_QUOTE)
          ),
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
