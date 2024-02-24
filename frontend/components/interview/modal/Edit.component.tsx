import LabeledInput from "@/components/common/LabeledInput.component";
import LabeledTextarea from "@/components/common/LabeledTextarea";
import {
  InterviewRes,
  interviewReqBody,
  putInterviewRecord,
  putInterviewUrl,
} from "@/src/apis/interview";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";

type InterviewEditComponentProps = {
  data: InterviewRes;
};

const InterviewEditComponent = ({ data }: InterviewEditComponentProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const applicantId = useAtomValue(interViewApplicantIdState);
  const [interviewData, setInterviewData] = useState({
    applicantId: applicantId,
    url: data.url,
    record: data.record,
  } as interviewReqBody);

  useEffect(() => {
    setInterviewData({
      applicantId: applicantId,
      url: data.url,
      record: data.record,
    });
  }, [data]);

  const { mutate: editUrl } = useMutation(putInterviewUrl, {
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries(["record", applicantId]);
    },
  });
  const { mutate: editRecord } = useMutation(putInterviewRecord, {
    onSettled: () => {
      queryClient.invalidateQueries(["record", applicantId]);
    },
  });

  const handleUpload = () => {
    setIsOpen(false);
    if (interviewData.url !== data.url) editUrl(interviewData);
    if (interviewData.record !== data.record) editRecord(interviewData);
  };

  return (
    <div className="flex flex-col w-full my-10 items-end">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className="text-sm text-secondary-100 underline underline-offset-2">
          {isOpen ? "접어 두기" : "면접기록 수정하기"}
        </span>
      </button>
      {isOpen ? (
        <div className="flex flex-col w-full gap-2 mt-4">
          <LabeledInput
            label="동영상 URL"
            id="interviewUrl"
            value={interviewData.url}
            onChange={(e) => {
              setInterviewData({
                ...interviewData,
                url: e.target.value,
              });
            }}
            placeholder="URL을 입력해주세요."
          />
          <LabeledTextarea
            label="면접 기록"
            id="interviewRecord"
            value={interviewData.record}
            onChange={(e) => {
              setInterviewData({
                ...interviewData,
                record: e.target.value,
              });
            }}
            placeholder="면접 기록을 입력해주세요."
          />
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 rounded-md flex justify-center items-center p-3 bg-light"
              onClick={() => {
                setIsOpen(false);
                setInterviewData({
                  applicantId: applicantId,
                  url: data.url,
                  record: data.record,
                });
              }}
            >
              취소
            </button>
            <button
              className="flex-1 rounded-md flex justify-center items-center p-3 bg-dark text-white"
              onClick={handleUpload}
            >
              수정하기
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InterviewEditComponent;
