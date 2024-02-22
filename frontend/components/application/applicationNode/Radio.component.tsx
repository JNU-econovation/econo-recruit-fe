"use client";

import RadioGroup from "@/components/common/Radio.component";
import Txt from "@/components/common/Txt.component";
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
import {
  ApplicationNode,
  type ApplicationRadio,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import {
  ApplicationNavbarContext,
  ApplicationQuestionsContext,
  applicationNavbarInitData,
  applicationQuestionsInitData,
} from "@/src/stores/application";
import { useContext } from "react";

interface ApplicationRadioProps {
  data: ApplicationNode;
}

const ApplicationRadio = ({ data }: ApplicationRadioProps) => {
  const radioData = data as ApplicationRadio;
  const [value, setValue] = useLocalStorage<string>(radioData.name, "");
  const [, setApplicationDate] = useContext(ApplicationQuestionsContext);
  const [, setApplicationNavbar] = useContext(ApplicationNavbarContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    if (radioData.name === "field") {
      switch (e.target.value) {
        case "디자이너":
          setApplicationDate(() => [
            ...applicationQuestionsInitData,
            ...APPLICATION_DESIGN,
          ]);
          setApplicationNavbar(() => [
            ...applicationNavbarInitData,
            ...APPLICATION_NAVBAR_DESIGN,
          ]);
          return;
        case "개발자":
          setApplicationDate(() => [
            ...applicationQuestionsInitData,
            ...APPLICATION_DEVELOPER,
          ]);
          setApplicationNavbar(() => [
            ...applicationNavbarInitData,
            ...APPLICATION_NAVBAR_DEVELOPER,
          ]);
          return;
        case "기획자":
          setApplicationDate(() => [
            ...applicationQuestionsInitData,
            ...APPLICATION_MANAGER,
          ]);
          setApplicationNavbar(() => [
            ...applicationNavbarInitData,
            ...APPLICATION_NAVBAR_MANAGER,
          ]);
          return;
      }
    }
  };

  return (
    <>
      {radioData.title && (
        <div className="mb-2">
          <Txt typography="h6">{radioData.title}</Txt>
          {radioData.require && <Txt>*</Txt>}
        </div>
      )}
      {radioData.subtitle && (
        <div className="mb-2">
          <Txt>{radioData.subtitle}</Txt>
        </div>
      )}
      <RadioGroup
        name={radioData.name}
        radioList={radioData.value}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default ApplicationRadio;
