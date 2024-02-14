import { ApplicationNode } from "@/src/constants/application/type";
import dynamic from "next/dynamic";

const ApplicationRadio = dynamic(
  () => import("./applicationNode/Radio.component")
);

const ApplicationRadioByTwoRank = dynamic(
  () => import("./applicationNode/RadioByTwoRank.component")
);

const ApplicationText = dynamic(
  () => import("./applicationNode/Text.component")
);

const ApplicationCheckboxWithEtc = dynamic(
  () => import("./applicationNode/CheckboxWithEtc.component")
);

const ApplicationTextarea = dynamic(
  () => import("./applicationNode/Textarea.component")
);

const ApplicationBar = dynamic(() => import("./applicationNode/Bar.component"));

const ApplicationJustText = dynamic(
  () => import("./applicationNode/JustText.component")
);

interface JunctionQuestionProps {
  applicationNodeData: ApplicationNode;
}

export const JunctionQuestion = ({
  applicationNodeData,
}: JunctionQuestionProps) => {
  const jsxNode = {
    radio: <ApplicationRadio data={applicationNodeData} />,
    radioByTwoRank: <ApplicationRadioByTwoRank data={applicationNodeData} />,
    radioForCheck: <></>,
    text: <ApplicationText data={applicationNodeData} />,
    textarea: <ApplicationTextarea data={applicationNodeData} />,
    booleanTextarea: <></>,
    bar: <ApplicationBar />,
    justText: <ApplicationJustText data={applicationNodeData} />,
    checkboxWithEtc: <ApplicationCheckboxWithEtc data={applicationNodeData} />,
    timeline: <></>,
  };

  return jsxNode[applicationNodeData.type];
};
