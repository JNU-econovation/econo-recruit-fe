"use client";

import CheckboxGroup, {
  Checkbox,
} from "@/components/common/Checkbox.component";
import Txt from "@/components/common/Txt.component";
import {
  ApplicationCheckboxWithEtcType,
  ApplicationNode,
} from "@/src/constants/application/type";
import { useState } from "react";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import { localStorage } from "@/src/functions/localstorage";

interface ApplicationCheckboxWithEtcProps {
  data: ApplicationNode;
}

const ApplicationCheckboxWithEtc = ({
  data,
}: ApplicationCheckboxWithEtcProps) => {
  const checkboxWithEtcData = data as ApplicationCheckboxWithEtcType;
  const [isOpenEtc, setIsOpenEtc] = useState(
    localStorage.get(checkboxWithEtcData.name + "Etc", "") !== ""
  );
  const [etcValue, setEtcValue] = useLocalStorage<string>(
    checkboxWithEtcData.name + "Etc",
    ""
  );
  const [checkboxValue, setCheckboxValue] = useLocalStorage<string[]>(
    checkboxWithEtcData.name,
    []
  );

  return (
    <>
      {checkboxWithEtcData.title && (
        <div className="mb-2">
          <Txt typography="h6" className="break-keep">{`${
            checkboxWithEtcData.title
          }${checkboxWithEtcData.require ? "*" : ""}`}</Txt>
        </div>
      )}
      {checkboxWithEtcData.subtitle && (
        <div className="mb-2 break-keep">
          <Txt>{checkboxWithEtcData.subtitle}</Txt>
        </div>
      )}
      <div className="pt-2">
        <CheckboxGroup
          checkboxList={checkboxWithEtcData.value}
          name={checkboxWithEtcData.name}
          onChange={(e) => {
            setCheckboxValue((prev) => {
              return prev.includes(e.target.value)
                ? prev.filter((value) => value !== e.target.value)
                : [...prev, e.target.value];
            });
          }}
          value={checkboxValue}
          splitNumber={3}
        />
        <div className="grid grid-cols-3 font-semibold gap-2">
          <Checkbox
            className="mt-2"
            name={checkboxWithEtcData.name}
            value="기타"
            checked={isOpenEtc}
            label="기타"
            onChange={() =>
              setIsOpenEtc((prev) => {
                if (prev) setEtcValue("");
                return !prev;
              })
            }
          />
          {isOpenEtc && (
            <input
              type="text"
              className="col-span-2 border border-gray-300 rounded-md p-4 mt-2"
              value={etcValue}
              onChange={(e) => setEtcValue(e.target.value)}
              placeholder="내용을 입력해주세요."
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationCheckboxWithEtc;
