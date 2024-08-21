"use client";

import Image from "next/image";
import LtIcon from "@/public/icons/lt.icon.svg";
import LtIconWhite from "@/public/icons/lt.icon.white.svg";
import Link from "next/link";
import { cn } from "@/src/utils/cn";
import { usePathname } from "next/navigation";

export type CommonNavbarCellProps = {
  title: string;
  short_title: string;
  type:
    | "apply"
    | "kanban"
    | "interview"
    | "applicant"
    | "sharepoint"
    | "toggle";
  target?: "_blank" | "_self" | "_parent" | "_top";
  href: string;
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
      target={target}
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
