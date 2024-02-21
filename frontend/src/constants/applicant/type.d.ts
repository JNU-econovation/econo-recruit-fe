interface ApplicantNodeBase {
  id: number;
  title: string;
  type: string;
}

interface ApplicantValue {
  name: string;
  title?: string;
}

interface ApplicantCustomFieldNode extends ApplicantNodeBase {
  type: "customField";
  value: ApplicantValue;
  subValue: ApplicantValue[];
}

interface ApplicantCustomHumanNode extends ApplicantNodeBase {
  type: "customHuman";
  value: {
    hunamName: ApplicantValue;
    humanPhone: ApplicantValue;
    humanEmail: ApplicantValue;
    humanEtc: ApplicantValue[];
  };
}

interface ApplicantShortSplitNode extends ApplicantNodeBase {
  type: "shortSplit";
  value: ApplicantValue[];
}

interface ApplicantTextareaNode extends ApplicantNodeBase {
  type: "textarea";
  value: ApplicantValue;
}

interface ApplicantBooleanTextareaNode extends ApplicantNodeBase {
  type: "booleanTextarea";
  subtitle: string[];
  booleanValue: ApplicantValue;
  value: ApplicantValue;
}

interface ApplicantTimelineNode extends ApplicantNodeBase {
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
