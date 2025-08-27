"use client";

import NavbarSkeleton from "@/components/application/loader/Navbar.skeleton";
import QuestionSkeleton from "@/components/application/loader/Question.skeleton";
import { CURRENT_GENERATION, PRODUCTION_HOSTNAME } from "@/src/constants";
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
import { useRouter, usePathname } from "next/navigation";
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
  const {
    START_DATE,
  } = require(`@/src/constants/application/${CURRENT_GENERATION}`);
  const setApplicationDate = useSetAtom(applicationDataAtom);
  const fieldData = localStorage.get<string>("field", "");
  const setApplicationNavbar = useSetAtom(applicationNavbarAtom);
  const router = useRouter();
  const pathname = usePathname();

  // 현재 사용자의 URL 정보 가져오기
  useEffect(() => {
    // 방법 2: window.location 사용 (클라이언트 사이드에서만)
    if (typeof window !== "undefined") {
      console.log("현재 URL:", window.location.href);
      console.log("현재 경로:", window.location.pathname);
      console.log("현재 도메인:", window.location.hostname);
      console.log("현재 포트:", window.location.port);
      console.log("현재 프로토콜:", window.location.protocol);
    }
  }, [pathname]);

  // FIXME: 서버의 시작 시간과 연동하면 좋겠다..
  useEffect(() => {
    const now = new Date();
    const startDate = new Date(
      START_DATE.year,
      START_DATE.month - 1,
      START_DATE.date,
      START_DATE.hours,
      START_DATE.minutes,
      START_DATE.seconds
    );
    if (now < startDate && window.location.hostname === PRODUCTION_HOSTNAME) {
      alert("1차 모집 시작 전입니다.");
      router.push("/");
    }
  }, []);

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
