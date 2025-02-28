"use client";

import Txt from "@/components/common/Txt.component";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import { JunctinOrLayout } from "../JunctionOrLayout";

interface ApplicationHorizontalLayoutProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationHorizontalLayout = ({
  applicationQuestion,
}: ApplicationHorizontalLayoutProps) => {
  return (
    <div className="flex gap-6 pr-12">
      <div className="flex-1">
        <div className="mb-4 flex gap-2">
          <Txt typography="h6">{`${applicationQuestion.id}. `}</Txt>
          <Txt typography="h6" className="break-all whitespace-pre-wrap">
            {`${applicationQuestion.title}${applicationQuestion.require ? "*" : ""}`}
          </Txt>
        </div>
        {applicationQuestion.subtitle && (
          <div className="pl-6">
            {applicationQuestion.subtitle
              .split(/<b>|<\/b>/)
              .map((line, index) =>
                index % 2 === 1 ? (
                  <Txt
                    typography="h6"
                    className="break-all text-sm whitespace-pre-wrap black"
                    key={index}
                  >
                    {line}
                  </Txt>
                ) : (
                  <Txt
                    className="break-all text-sm whitespace-pre-wrap"
                    key={index}
                  >
                    {line}
                  </Txt>
                )
              )}
            {applicationQuestion.alert && (
              <div className="mt-4">
                <Txt className=" underline font-semibold">
                  ⚠️ {applicationQuestion.alert}
                </Txt>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex-1">
        {applicationQuestion.nodes.map((node, index) => (
          <div key={`${applicationQuestion.id} ${index}`} className="mb-4">
            <JunctinOrLayout node={node} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationHorizontalLayout;
