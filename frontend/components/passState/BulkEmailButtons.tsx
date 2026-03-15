"use client";

import { sendEmailToAll, type EmailState } from "@/src/apis/passState";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const EMAIL_STATE_LABEL_MAP: Record<EmailState, string> = {
  "first-passed": "1차 합격자",
  "first-failed": "1차 불합격자",
  "final-passed": "최종 합격자",
  "final-failed": "최종 불합격자",
};

const BulkEmailButtons = () => {
  const selectedGeneration = usePathname().split("/")[2];
  const { mutate: sendEmailAll } = useMutation(sendEmailToAll);

  const onSendEmailAll = (state: EmailState) => {
    const ok = confirm(
      `${EMAIL_STATE_LABEL_MAP[state]} 전체에게 결과 이메일을 발송하시겠습니까?`
    );
    if (!ok) return;
    sendEmailAll({ year: Number(selectedGeneration), state });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {(
        [
          "first-passed",
          "first-failed",
          "final-passed",
          "final-failed",
        ] as EmailState[]
      ).map((state) => (
        <button
          key={state}
          type="button"
          className="border px-4 py-2 rounded-lg hover:bg-primary-100"
          onClick={() => onSendEmailAll(state)}
        >
          {EMAIL_STATE_LABEL_MAP[state]} 일괄 발송
        </button>
      ))}
    </div>
  );
};

export default BulkEmailButtons;
