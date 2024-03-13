"use client";

import Icon from "./Icon";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialSearchTerm = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams(Object.fromEntries(searchParams));

    startTransition(() => {
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearchTerm, pathname]);

  return (
    <div className="flex items-center py-2 px-4 bg-primary-100 rounded-2xl gap-2">
      <Icon icon="search" />
      <input
        className="p-2 color-secondary-100 bg-transparent outline-none"
        type="search"
        placeholder="search"
        defaultValue={initialSearchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};
export default Search;
