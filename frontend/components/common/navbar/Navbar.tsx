import { MainNavbar } from "@/src/constants";
import CommonNavbarCell from "./NavbarCell";
import NavbarUserInfo from "./UserInfo";
import { NavbarOperation } from "./NavbarOperation";
import Link from "next/link";

interface CommonNavbarProps {
  generation: string;
  isShort?: boolean;
  currentPath: string;
}

const CommonNavbar = ({
  generation,
  isShort = false,
  currentPath,
}: CommonNavbarProps) => {
  return (
    <nav className="flex flex-col transition-all">
      <Link
        className="flex flex-col font-bold h-36 justify-end text-4xl"
        href="/"
      >
        {!isShort && <div>ECONOVATION</div>}
        <div>RECRUIT</div>
        <div>{generation}th</div>
      </Link>
      <div className="flex flex-col gap-8 mt-8 text-xl">
        {MainNavbar.map((item) => (
          <CommonNavbarCell
            key={item.type}
            currentPath={currentPath}
            isShort={isShort}
            item={item}
          />
        ))}
        <NavbarOperation
          currentPath={currentPath}
          generation={generation}
          isShort={isShort}
        />
      </div>
      <NavbarUserInfo />
    </nav>
  );
};

export default CommonNavbar;
