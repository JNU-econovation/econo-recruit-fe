"use client";

import { cn } from "@/src/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

interface SortListProps {
  sortList: Readonly<{ type: string; string: string }[]>;
}

const SortList = ({ sortList }: SortListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [order, setOrder] = useState(
    searchParams.get("order") || sortList[0].type
  );
  const [isOpen, setIsOpen] = useState(false);

  const onOrderChange = (order: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("order", order);
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center bg-primary-100 p-4 gap-2 rounded-2xl text-secondary-200 z-20"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        Sort by :
        <span className="font-semibold capitalize text-dark">
          {sortList.find((sort) => sort.type === order)?.string}
        </span>
        <Icon icon="chevronDown" />
      </button>
      {isOpen ? (
        <div className="flex flex-col absolute w-full border-light rounded-xl border-[1px] bg-white p-6 font-semibold -mt-4 text-dark">
          {sortList.map((sort) => (
            <button
              key={sort.type}
              disabled={sort.type === order}
              onClick={() => {
                setOrder(sort.type);
                onOrderChange(sort.type);
                setIsOpen(false);
              }}
              className={cn(
                "flex justify-end py-2 px-6 capitalize cursor-pointer",
                { "text-secondary-200 cursor-auto": sort.type === order }
              )}
            >
              {sort.string}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SortList;
