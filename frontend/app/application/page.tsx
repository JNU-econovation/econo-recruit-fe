"use client";

import ApplicationNavbar from "@/components/application/Navbar.component";
import ApplicationQuestion from "@/components/application/Question.component";
import {
  APPLICATION_DESIGN,
  APPLICATION_NAVBAR_DESIGN,
} from "@/src/constants/application/26/designer";
import {
  APPLICATION_DEVELOPER,
  APPLICATION_NAVBAR_DEVELOPER,
} from "@/src/constants/application/26/developer";
import {
  APPLICATION_MANAGER,
  APPLICATION_NAVBAR_MANAGER,
} from "@/src/constants/application/26/manager";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import {
  ApplicationNavbarContext,
  ApplicationQuestionsContext,
  applicationNavbarInitData,
  applicationQuestionsInitData,
} from "@/src/stores/application";
import { useEffect, useState } from "react";

const ApplicationPage = () => {
  const [applicationQuestions, setApplicationDate] = useState(
    applicationQuestionsInitData
  );
  const [fieldData, _] = useLocalStorage<string>("field", "");
  const [applicationNavbarData, setApplicationNavbarData] = useState(
    applicationNavbarInitData
  );

  useEffect(() => {
    switch (fieldData) {
      case "디자이너":
        setApplicationDate(() => [
          ...applicationQuestionsInitData,
          ...APPLICATION_DESIGN,
        ]);
        setApplicationNavbarData(() => [
          ...applicationNavbarInitData,
          ...APPLICATION_NAVBAR_DESIGN,
        ]);
        return;
      case "개발자":
        setApplicationDate(() => [
          ...applicationQuestionsInitData,
          ...APPLICATION_DEVELOPER,
        ]);
        setApplicationNavbarData(() => [
          ...applicationNavbarInitData,
          ...APPLICATION_NAVBAR_DEVELOPER,
        ]);
        return;
      case "기획자":
        setApplicationDate(() => [
          ...applicationQuestionsInitData,
          ...APPLICATION_MANAGER,
        ]);
        setApplicationNavbarData(() => [
          ...applicationNavbarInitData,
          ...APPLICATION_NAVBAR_MANAGER,
        ]);
        return;
    }
  }, []);

  return (
    <section className="flex gap-24 mt-24 min-w-[1280px]">
      <ApplicationNavbarContext.Provider
        value={[applicationNavbarData, setApplicationNavbarData]}
      >
        <ApplicationNavbar
          className="flex-1"
          applicationNavbar={applicationNavbarData}
        />
        <ApplicationQuestionsContext.Provider
          value={[applicationQuestions, setApplicationDate]}
        >
          <ApplicationQuestion className="flex-[3_0_0]" />
        </ApplicationQuestionsContext.Provider>
      </ApplicationNavbarContext.Provider>
    </section>
  );
};

export default ApplicationPage;
