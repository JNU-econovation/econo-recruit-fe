import { ApplicantReq } from "@/src/apis/applicant/applicant";
import { ReactNode } from "react";
import ApplicantCustomField from "./applicantNode/CustomField.component";
import ApplicantCustomHuman from "./applicantNode/CustomHuman.component";
import ApplicantShortSplit from "./applicantNode/ShortSplit.component";
import ApplicantTextarea from "./applicantNode/Textarea.component";
import ApplicantBooleanTextarea from "./applicantNode/BooleanTextarea.component";

interface JunctionApplicantProps {
  applicantNodeData: ApplicantNode;
  data: ApplicantReq[];
}

export const JunctionApplicant = ({
  applicantNodeData,
  data: applicantData,
}: JunctionApplicantProps) => {
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
