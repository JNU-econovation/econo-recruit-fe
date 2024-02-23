"use client";

import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SortListComponent = {
  sortList: { type: string; string: string }[];
  selected: string;
  onChange?: () => void;
};

const SortListComponent = ({
  sortList,
  selected,
  onChange = () => {},
}: SortListComponent) => {
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
    onChange();
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
        <span className="font-semibold capitalize text-dark">{order}</span>
        <img src="/icons/chevron-down.svg" alt="drop_down"></img>
      </button>
      {isOpen ? (
        <div className="flex flex-col absolute w-full border-light rounded-xl border-[1px] bg-white p-6 font-semibold -mt-4 text-dark">
          {sortList.map((sort) => (
            <button
              key={sort.type}
              disabled={sort.type === selected}
              onClick={() => {
                setOrder(sort.type);
                onOrderChange(sort.type);
                setIsOpen(false);
              }}
              className={classNames(
                "flex justify-end py-2 px-6 capitalize cursor-pointer",
                { "text-secondary-200 cursor-auto": sort.type === selected }
              )}
            >
              {sort.type}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SortListComponent;
