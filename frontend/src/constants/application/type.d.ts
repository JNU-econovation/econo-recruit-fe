import { ReplacerType } from "@/src/functions/replacer";
import { ValidatorType } from "@/src/functions/validator";

interface ApplicationNodeBase {
  title?: string;
  subtitle?: string;
  require: boolean;
  name: string;
  errorMessages?: string;
}

interface BaseWithValues extends ApplicationNodeBase {
  value: string[];
}

interface ApplicationRadio extends BaseWithValues {
  type: "radio";
}

interface BaseWithValuesWithSplitNumber extends BaseWithValues {
  splitNumber: 2 | 3 | 4;
}

interface ApplicationRadioByTwoRank extends ApplicationNodeBase {
  type: "radioByTwoRank";
  subNodes: BaseWithValuesWithSplitNumber[];
}

interface ApplicationRadioForCheck extends BaseWithValues {
  type: "radioForCheck";
  title?: string;
  require: boolean;
  value: string[];
}

interface ApplicationText extends ApplicationNodeBase {
  type: "text";
  validate?: ValidatorType;
  replace?: ReplacerType;
  maxLength?: number;
  minLength?: number;
}

interface ApplicationTextarea extends ApplicationNodeBase {
  type: "textarea";
}

interface ApplicationBooleanTextarea extends ApplicationNodeBase {
  type: "booleanTextarea";
  value: string[];
  subNodes: {
    type: "true" | "false";
    title?: string;
    subtitle?: string;
    require: boolean;
    name: string;
  }[];
}
interface ApplicationBar {
  type: "bar";
}

interface ApplicationJustText {
  type: "justText";
  title: string;
  subtitle?: string;
}

interface ApplicationCheckboxType extends ApplicationNodeBase {
  type: "checkbox";
  value: string[];
}

interface ApplicationCheckboxWithEtcType extends ApplicationNodeBase {
  type: "checkboxWithEtc";
  value: string[];
}

interface ApplicationTimelineType extends ApplicationNodeBase {
  type: "timeline";
}

interface ApplicationTimeline {
  seperate: 30 | 60;
  time: {
    startTime: Date;
    endTime: Date;
  }[];
  disableTime: {
    startTime: Date;
    endTime: Date;
  }[];
}

type ApplicationNode =
  | ApplicationRadio
  | ApplicationRadioByTwoRank
  | ApplicationRadioForCheck
  | ApplicationText
  | ApplicationTextarea
  | ApplicationBooleanTextarea
  | ApplicationBar
  | ApplicationJustText
  | ApplicationCheckboxType
  | ApplicationCheckboxWithEtcType
  | ApplicationTimelineType;

type ApplicationQuestion = {
  id: number;
  title?: string;
  subtitle?: string;
  require?: boolean;
  direction:
    | "vertical"
    | "horizontal"
    | "booleanTextarea"
    | "radioForCheck"
    | "timeline";
  nodes: (ApplicationNode | ApplicationQuestion)[];
};
