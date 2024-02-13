"use client";

import { TimelineCell } from "@/components/application/applicationLayout/timeline/Timeline.component";
import Txt from "@/components/common/Txt.component";
import { getApplicantTimeTables } from "@/src/apis/applicant/applicant";
import { CURRENT_GENERATION } from "@/src/constants";
import { ApplicationTimeline } from "@/src/constants/application/type";
import { dateSplicer } from "@/src/functions/date";
import { minimumIntegerDigits } from "@/src/functions/replacer";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { FC } from "react";

interface ApplicantTimelineNodeProps {
  postId: string;
}

const ApplicantTimelineNode: FC<ApplicantTimelineNodeProps> = ({ postId }) => {
  const data = require(`@/src/constants/application/${CURRENT_GENERATION}.ts`);
  const { time, seperate } = data.APPLICATION_TIMELINE as ApplicationTimeline;

  const {
    data: timeline,
    isLoading,
    isError,
  } = useQuery<number[]>(
    ["applicantTimeline", postId],
    () => getApplicantTimeTables(postId),
    {
      enabled: !!postId,
    }
  );

  if (!timeline || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div>
      {time.map((time, startIndex) => (
        <div className="w-full" key={startIndex}>
          <Txt
            typography="h6"
            className="block pb-8"
          >{`${time.startTime.getMonth()}월 ${time.startTime.getDate()}일`}</Txt>
          <div className="w-full flex">
            {dateSplicer(time.startTime, time.endTime, seperate).map(
              (date, index) => (
                <span
                  className="flex-1 border-l translate-x-6 mb-8 w-4"
                  key={index}
                >
                  <Txt
                    className={classNames(
                      "-translate-x-1/2 block w-fit -translate-y-6 h-2",
                      {
                        "opacity-0":
                          minimumIntegerDigits(date.getMinutes(), 2) === "30",
                      }
                    )}
                  >
                    {`${minimumIntegerDigits(
                      date.getHours(),
                      2
                    )}:${minimumIntegerDigits(date.getMinutes(), 2)}`}
                  </Txt>
                  {dateSplicer(time.startTime, time.endTime, seperate)
                    .length !==
                    index + 1 && (
                    <div
                      className={classNames(
                        "h-8 block",
                        timeline.includes(index + startIndex * seperate)
                          ? "bg-primary"
                          : "bg-[#EFEFEF]"
                      )}
                    ></div>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicantTimelineNode;
