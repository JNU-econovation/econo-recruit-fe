"use client";

import Txt from "@/components/common/Txt.component";
import type {
  ApplicationQuestion,
  ApplicationTimeline,
} from "@/src/constants/application/type";
import { convertDay, dateSplicer } from "@/src/functions/date";
import TimelineRow from "./TimelineRow.component";
import { CURRENT_GENERATION } from "@/src/constants";
import { cn } from "@/src/utils/cn";

interface TimelineCellProps {
  startIndex: number;
  startTime: Date;
  endTime: Date;
  disableTime: { startTime: Date; endTime: Date }[];
  seperate: number;
}

export const TimelineCell = ({
  startIndex,
  startTime,
  endTime,
  disableTime,
  seperate,
}: TimelineCellProps) => {
  const dates = dateSplicer(startTime, endTime, seperate);

  return (
    <div className="w-full">
      <Txt
        typography="h6"
        className="block pb-8"
      >{`${startTime.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      })}`}</Txt>
      <div className="w-full flex">
        {dates.map((date, index) => (
          <TimelineRow
            key={index}
            index={index + startIndex * seperate}
            date={date}
            isLast={dates.length !== index + 1}
          />
        ))}
      </div>
    </div>
  );
};

interface ApplicationTimelineProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationTimelineLayout = ({
  applicationQuestion,
}: ApplicationTimelineProps) => {
  const data = require(`@/src/constants/application/${CURRENT_GENERATION}.ts`);
  const { disableTime, time, seperate } =
    data.APPLICATION_TIMELINE as ApplicationTimeline;

  return (
    <div
      className={cn("w-full", {
        "pr-12": applicationQuestion.id !== -1,
      })}
    >
      {applicationQuestion.id !== -1 && applicationQuestion.title && (
        <div className="pb-6">
          <Txt typography="h6">{`${applicationQuestion.id}. `}</Txt>
          <Txt typography="h6" className="break-all">{`${
            applicationQuestion.title
          }${applicationQuestion.require ? "*" : ""}`}</Txt>
        </div>
      )}
      {applicationQuestion.subtitle && (
        <>
          {applicationQuestion.subtitle.split("\n").map((line, index) => (
            <Txt className="break-all block" key={index}>
              {line}
            </Txt>
          ))}
        </>
      )}
      <div className="py-6">
        {applicationQuestion.alert && (
          <Txt className="underline font-semibold">
            ⚠️ {applicationQuestion.alert}
          </Txt>
        )}
      </div>
      {time.map((time, index) => (
        <div key={index}>
          <TimelineCell
            startIndex={index}
            startTime={time.startTime}
            endTime={time.endTime}
            disableTime={disableTime}
            seperate={seperate}
          />
        </div>
      ))}
    </div>
  );
};

export default ApplicationTimelineLayout;
