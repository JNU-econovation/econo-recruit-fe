"use client";

import type { ApplicationQuestion } from "@/src/constants/application/type";
import dynamic from "next/dynamic";

const ApplicationHorizontalLayout = dynamic(
  () => import("./applicationLayout/Horizontal.componet"),
  { ssr: false }
);

const ApplicationVerticalLayout = dynamic(
  () => import("./applicationLayout/Vertical.component"),
  { ssr: false }
);

const ApplicationBooleanTextareaLayout = dynamic(
  () => import("./applicationLayout/BooleanTextarea.component"),
  { ssr: false }
);

const ApplicationRadioForCheckLayout = dynamic(
  () => import("./applicationLayout/RadioForCheck.component"),
  { ssr: false }
);

const ApplicationTimelineLayout = dynamic(
  () => import("./applicationLayout/timeline/Timeline.component"),
  { ssr: false }
);

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
