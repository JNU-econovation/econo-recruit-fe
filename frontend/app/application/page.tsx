"use client";

import ApplicationNavbar from "@/components/application/Navbar";
import ApplicationQuestion from "@/components/application/Question.component";
import { CURRENT_GENERATION } from "@/src/constants";
import {
  APPLICATION_DESIGN,
  APPLICATION_NAVBAR_DESIGN,
} from "@/src/constants/application/28/designer";
import {
  APPLICATION_DEVELOPER,
  APPLICATION_NAVBAR_DEVELOPER,
} from "@/src/constants/application/28/developer";
import {
  APPLICATION_MANAGER,
  APPLICATION_NAVBAR_MANAGER,
} from "@/src/constants/application/28/manager";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import {
  applicationDataAtom,
  applicationNavbarAtom,
} from "@/src/stores/application";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

const ApplicationPage = () => {
  const [applicationQuestions, setApplicationDate] =
    useAtom(applicationDataAtom);
  const [fieldData, _] = useLocalStorage<string>("field", "");
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
      <ApplicationQuestion
        className="flex-[3_0_0]"
        applicationQuestions={applicationQuestions}
      />
    </section>
  );
};

export default ApplicationPage;
