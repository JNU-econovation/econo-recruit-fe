"use client";

import Txt from "@/components/common/Txt.component";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import classNames from "classnames";
import { JunctinOrLayout } from "../JunctionOrLayout";

interface ApplicationVerticalLayoutProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationVerticalLayout = ({
  applicationQuestion,
}: ApplicationVerticalLayoutProps) => {
  return (
    <div className={classNames(applicationQuestion.id !== -1 ? "pr-12" : "")}>
      {applicationQuestion.id !== -1 && applicationQuestion.title && (
        <>
          <Txt typography="h6">{`${applicationQuestion.id}. `}</Txt>
          <Txt typography="h6" className="break-keep">{`${
            applicationQuestion.title
          }${applicationQuestion.require ? "*" : ""}`}</Txt>
        </>
      )}
      {applicationQuestion.nodes.map((node, index) => (
        <div key={index} className="mb-4">
          <JunctinOrLayout node={node} />
        </div>
      ))}
    </div>
  );
};

export default ApplicationVerticalLayout;
