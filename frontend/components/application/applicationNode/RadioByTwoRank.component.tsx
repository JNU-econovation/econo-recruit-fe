"use client";

import RadioGroup from "@/components/common/Radio.component";
import Txt from "@/components/common/Txt.component";
import {
  ApplicationNode,
  ApplicationRadioByTwoRank,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";

interface ApplicationRadioByTwoRankProps {
  data: ApplicationNode;
}

const ApplicationRadioByTwoRank = ({
  data,
}: ApplicationRadioByTwoRankProps) => {
  const radioByTwoRankData = data as ApplicationRadioByTwoRank;
  const firstNode = radioByTwoRankData.subNodes[0];
  const secondNode = radioByTwoRankData.subNodes[1];
  const [firstValue, setFirstValue] = useLocalStorage(firstNode.name, "init");
  const [secondValue, setSecondValue] = useLocalStorage(secondNode.name, "");

  return (
    <>
      {radioByTwoRankData.title && (
        <div className="mb-2">
          <Txt typography="h6">{`${radioByTwoRankData.title}${
            radioByTwoRankData.require ? "*" : ""
          }`}</Txt>
        </div>
      )}
      <Txt className="my-4 block">{firstNode.title}</Txt>
      <RadioGroup
        name={firstNode.name}
        radioList={firstNode.value}
        splitNumber={firstNode.splitNumber}
        value={firstValue}
        isSpaned={true}
        disableValue={secondValue}
        onChange={(e) => {
          setFirstValue(e.target.value);
          setSecondValue("");
        }}
      />
      {firstValue !== "init" && (
        <>
          <Txt className="my-4 block">{secondNode.title}</Txt>
          <RadioGroup
            name={secondNode.name}
            radioList={secondNode.value}
            splitNumber={secondNode.splitNumber}
            value={secondValue}
            isSpaned={true}
            disableValue={firstValue}
            onChange={(e) => {
              setSecondValue(e.target.value);
            }}
          />
        </>
      )}
    </>
  );
};

export default ApplicationRadioByTwoRank;
