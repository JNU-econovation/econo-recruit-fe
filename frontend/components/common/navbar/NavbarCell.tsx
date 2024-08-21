"use client";

import Image from "next/image";
import LtIcon from "@/public/icons/lt.icon.svg";
import LtIconWhite from "@/public/icons/lt.icon.white.svg";
import Link from "next/link";
import { cn } from "@/src/utils/cn";
import { usePathname } from "next/navigation";

type CommonNavbarCellProps = {
  type: string; //TODO: 타입 정의하기
  href: string;
  target: string;
  short_title: string;
  title: string;
};

const CommonNavbarCell = ({
  href,
  short_title,
  target,
  title,
  type,
}: CommonNavbarCellProps) => {
  const [_, currentType] = usePathname().split("/");
  const isShort = currentType === "kanban";

  const linkButtonClassName =
    "flex justify-between p-4 hover:bg-secondary-100 hover:text-white rounded-lg";

  return (
    <Link
      className={cn(linkButtonClassName, {
        "!bg-black !text-white": currentType === type,
      })}
      href={href}
      target={target === "_blank" ? "_blank" : ""}
      key={type}
    >
      {isShort ? short_title : title}
      <Image
        src={currentType !== type ? LtIcon : LtIconWhite}
        alt="right arrow"
      />
    </Link>
  );
};

export default CommonNavbarCell;
