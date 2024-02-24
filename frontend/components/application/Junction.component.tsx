import { ApplicationNode } from "@/src/constants/application/type";
import { ReactNode } from "react";

import ApplicationRadio from "./applicationNode/Radio.component";
import ApplicationRadioByTwoRank from "./applicationNode/RadioByTwoRank.component";
import ApplicationText from "./applicationNode/Text.component";
import ApplicationCheckboxWithEtc from "./applicationNode/CheckboxWithEtc.component";
import ApplicationTextarea from "./applicationNode/Textarea.component";
import ApplicationBar from "./applicationNode/Bar.component";
import ApplicationJustText from "./applicationNode/JustText.component";

interface JunctionQuestionProps {
  applicationNodeData: ApplicationNode;
}

export const JunctionQuestion = ({
  applicationNodeData,
}: JunctionQuestionProps) => {
  const jsxNode: Record<ApplicationNode["type"], ReactNode> = {
    radio: <ApplicationRadio data={applicationNodeData} />,
    radioByTwoRank: <ApplicationRadioByTwoRank data={applicationNodeData} />,
    radioForCheck: <></>,
    text: <ApplicationText data={applicationNodeData} />,
    textarea: <ApplicationTextarea data={applicationNodeData} />,
    booleanTextarea: <></>,
    bar: <ApplicationBar />,
    justText: <ApplicationJustText data={applicationNodeData} />,
    checkboxWithEtc: <ApplicationCheckboxWithEtc data={applicationNodeData} />,
    checkbox: <></>,
    timeline: <></>,
  };

  return jsxNode[applicationNodeData.type];
};
