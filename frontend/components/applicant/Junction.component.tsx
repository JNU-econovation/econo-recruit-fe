import { ApplicantReq } from "@/src/apis/applicant/applicant";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

const ApplicantCustomField = dynamic(
  () => import("./applicantNode/CustomField.component")
);

const ApplicantCustomHuman = dynamic(
  () => import("./applicantNode/CustomHuman.component")
);

const ApplicantShortSplit = dynamic(
  () => import("./applicantNode/ShortSplit.component")
);

const ApplicantTextarea = dynamic(
  () => import("./applicantNode/Textarea.component")
);

const ApplicantBooleanTextarea = dynamic(
  () => import("./applicantNode/BooleanTextarea.component")
);

interface JunctionApplicantProps {
  applicantNodeData: ApplicantNode;
  data: ApplicantReq[];
}

export const JunctionApplicant: FC<JunctionApplicantProps> = ({
  applicantNodeData,
  data: applicantData,
}) => {
  const jsxNode: Record<ApplicantNode["type"], ReactNode> = {
    customField: (
      <ApplicantCustomField nodeData={applicantNodeData} data={applicantData} />
    ),
    customHuman: (
      <ApplicantCustomHuman nodeData={applicantNodeData} data={applicantData} />
    ),
    shortSplit: (
      <ApplicantShortSplit nodeData={applicantNodeData} data={applicantData} />
    ),
    textarea: (
      <ApplicantTextarea nodeData={applicantNodeData} data={applicantData} />
    ),
    booleanTextarea: (
      <ApplicantBooleanTextarea
        nodeData={applicantNodeData}
        data={applicantData}
      />
    ),
    timeline: <></>,
  };

  return jsxNode[applicantNodeData.type];
};
