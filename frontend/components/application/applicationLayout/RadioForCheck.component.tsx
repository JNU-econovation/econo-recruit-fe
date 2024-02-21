import Txt from "@/components/common/Txt.component";
import type {
  ApplicationQuestion,
  ApplicationRadioForCheck,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import classNames from "classnames";
import Link from "next/link";

interface RadioCellProps {
  applicationQuestion: ApplicationQuestion;
  radioForCheckData: ApplicationRadioForCheck;
}

const RadioCell = ({
  applicationQuestion,
  radioForCheckData,
}: RadioCellProps) => {
  const [radio, setRadio] = useLocalStorage<string>(
    radioForCheckData.name,
    "동의하지 않습니다."
  );
  return (
    <div className="flex-1">
      <Link
        href={
          radioForCheckData.name === "personalInformationAgree"
            ? "https://lightning-derby-674.notion.site/ad720024b5ab482caaa78419c57b373a?pvs=4"
            : radioForCheckData.name === "personalInformationAgreeForPortfolio"
            ? "https://lightning-derby-674.notion.site/50b16833d1c549dba80ba0949a119de1?pvs=4"
            : ""
        }
        target="_blank"
      >
        <Txt
          typography="h6"
          className="mb-4 flex-1 block underline underline-offset-4"
        >
          {radioForCheckData.title}
        </Txt>
      </Link>
      <input
        className="mr-2"
        type="radio"
        name={radioForCheckData.name}
        id={radioForCheckData.name + radioForCheckData.value[0]}
        checked={radio === radioForCheckData.value[0]}
        value={radioForCheckData.value[0]}
        onChange={(e) => {
          setRadio(e.target.value);
        }}
      />
      <label
        className="mr-4"
        htmlFor={radioForCheckData.name + radioForCheckData.value[0]}
      >
        {radioForCheckData.value[0]}
      </label>
      <input
        className="mr-2"
        type="radio"
        name={radioForCheckData.name}
        id={radioForCheckData.name + radioForCheckData.value[1]}
        checked={radio === radioForCheckData.value[1]}
        value={radioForCheckData.value[1]}
        onChange={(e) => {
          setRadio(e.target.value);
        }}
      />
      <label
        className="mr-4"
        htmlFor={radioForCheckData.name + radioForCheckData.value[1]}
      >
        {radioForCheckData.value[1]}
      </label>
    </div>
  );
};

interface ApplicationRadioForCheckProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationRadioForCheckLayout = ({
  applicationQuestion,
}: ApplicationRadioForCheckProps) => {
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
      <div className="flex py-8 pl-12">
        {applicationQuestion.nodes.map((node, index) => {
          const radioForCheckData = node as ApplicationRadioForCheck;
          return (
            <RadioCell
              applicationQuestion={applicationQuestion}
              radioForCheckData={radioForCheckData}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationRadioForCheckLayout;
