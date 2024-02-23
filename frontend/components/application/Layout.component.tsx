import type { ApplicationQuestion } from "@/src/constants/application/type";
import ApplicationHorizontalLayout from "./applicationLayout/Horizontal.componet";
import ApplicationVerticalLayout from "./applicationLayout/Vertical.component";
import ApplicationBooleanTextareaLayout from "./applicationLayout/BooleanTextarea.component";
import ApplicationRadioForCheckLayout from "./applicationLayout/RadioForCheck.component";
import ApplicationTimelineLayout from "./applicationLayout/timeline/Timeline.component";

interface ApplicationLayoutProps {
  applicationQuestion: ApplicationQuestion;
}

export const ApplicationLayout = ({
  applicationQuestion,
}: ApplicationLayoutProps) => {
  const jsxNode = {
    horizontal: (
      <ApplicationHorizontalLayout applicationQuestion={applicationQuestion} />
    ),
    vertical: (
      <ApplicationVerticalLayout applicationQuestion={applicationQuestion} />
    ),
    booleanTextarea: (
      <ApplicationBooleanTextareaLayout
        applicationQuestion={applicationQuestion}
      />
    ),
    radioForCheck: (
      <ApplicationRadioForCheckLayout
        applicationQuestion={applicationQuestion}
      />
    ),
    timeline: (
      <ApplicationTimelineLayout applicationQuestion={applicationQuestion} />
    ),
  };

  return jsxNode[applicationQuestion["direction"]];
};
