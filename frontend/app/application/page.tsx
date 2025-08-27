"use client";

import NavbarSkeleton from "@/components/application/loader/Navbar.skeleton";
import QuestionSkeleton from "@/components/application/loader/Question.skeleton";
import {
  APPLICATION_DESIGN,
  APPLICATION_NAVBAR_DESIGN,
} from "@/src/constants/application/30/designer";
import {
  APPLICATION_DEVELOPER,
  APPLICATION_NAVBAR_DEVELOPER,
} from "@/src/constants/application/30/developer";
import {
  APPLICATION_MANAGER,
  APPLICATION_NAVBAR_MANAGER,
} from "@/src/constants/application/30/manager";
import { localStorage } from "@/src/functions/localstorage";
import {
  applicationDataAtom,
  applicationNavbarAtom,
} from "@/src/stores/application";
import { useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ApplicationNavbar = dynamic(
  () => import("@/components/application/Navbar"),
  {
    ssr: false,
    loading: () => <NavbarSkeleton />,
  }
);

const ApplicationQuestion = dynamic(
  () => import("@/components/application/Question"),
  {
    ssr: false,
    loading: () => <QuestionSkeleton />,
  }
);

const ApplicationPage = () => {
  const setApplicationDate = useSetAtom(applicationDataAtom);
  const fieldData = localStorage.get<string>("field", "");
  const setApplicationNavbar = useSetAtom(applicationNavbarAtom);

  useEffect(() => {
    switch (fieldData) {
      case "디자이너":
        setApplicationDate(() => [
          ...applicationDataAtom.init,
          ...APPLICATION_DESIGN,
        ]);
        setApplicationNavbar(() => [
          ...applicationNavbarAtom.init,
          ...APPLICATION_NAVBAR_DESIGN,
        ]);
        return;
      case "개발자":
        setApplicationDate(() => [
          ...applicationDataAtom.init,
          ...APPLICATION_DEVELOPER,
        ]);
        setApplicationNavbar(() => [
          ...applicationNavbarAtom.init,
          ...APPLICATION_NAVBAR_DEVELOPER,
        ]);
        return;
      case "기획자":
        setApplicationDate(() => [
          ...applicationDataAtom.init,
          ...APPLICATION_MANAGER,
        ]);
        setApplicationNavbar(() => [
          ...applicationNavbarAtom.init,
          ...APPLICATION_NAVBAR_MANAGER,
        ]);
        return;
    }
  }, [fieldData]);

  return (
    <section className="flex gap-24 mt-24 min-w-[1280px]">
      <ApplicationNavbar />
      <ApplicationQuestion />
    </section>
  );
};

export default ApplicationPage;
