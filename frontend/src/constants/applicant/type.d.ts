interface BaseApplicantNode {
  id: number;
  title: string;
}

interface ApplicantValue {
  name: string;
  title?: string;
}

interface ApplicantCustomFieldNode extends BaseApplicantNode {
  type: "customField";
  value: ApplicantValue;
  subValue: ApplicantValue[];
}

interface ApplicantCustomHumanNode extends BaseApplicantNode {
  type: "customHuman";
  value: {
    hunamName: ApplicantValue;
    humanPhone: ApplicantValue;
    humanEmail: ApplicantValue;
    humanEtc: ApplicantValue[];
  };
}

interface ApplicantShortSplitNode extends BaseApplicantNode {
  type: "shortSplit";
  value: ApplicantValue[];
}

interface ApplicantTextareaNode extends BaseApplicantNode {
  type: "textarea";
  value: ApplicantValue;
}

interface ApplicantBooleanTextareaNode extends BaseApplicantNode {
  type: "booleanTextarea";
  subtitle: string[];
  booleanValue: ApplicantValue;
  value: ApplicantValue;
}

interface ApplicantTimelineNode extends BaseApplicantNode {
  type: "timeline";
  name: string;
}

type ApplicantNode =
  | ApplicantCustomFieldNode
  | ApplicantCustomHumanNode
  | ApplicantShortSplitNode
  | ApplicantTextareaNode
  | ApplicantBooleanTextareaNode
  | ApplicantTimelineNode;
