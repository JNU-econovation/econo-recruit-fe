"use client";

import Icon from "../common/Icon";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const InterviewSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams));
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form className="flex items-center py-2 px-4 bg-primary-100 rounded-2xl gap-2">
      <Icon icon="search" />
      <input
        className="p-2 color-secondary-100 bg-transparent outline-none"
        type="search"
        placeholder="search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      ></input>
    </form>
  );
};
export default InterviewSearch;
