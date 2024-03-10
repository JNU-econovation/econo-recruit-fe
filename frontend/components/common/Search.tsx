"use client";

import Icon from "./Icon";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchKeyword = searchParams.get("search") ?? "";

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams));
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex items-center py-2 px-4 bg-primary-100 rounded-2xl gap-2"
    >
      <Icon icon="search" />
      <input
        className="p-2 color-secondary-100 bg-transparent outline-none"
        type="search"
        placeholder="search"
        defaultValue={searchKeyword}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </form>
  );
};
export default Search;
