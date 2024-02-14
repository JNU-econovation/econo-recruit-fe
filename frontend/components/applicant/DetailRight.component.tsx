"use client";

import { ApplicantReq } from "@/src/apis/applicant/applicant";
import { Fragment, useEffect } from "react";

import Txt from "../common/Txt.component";
import ApplicantTimelineNode from "./applicantNode/Timeline.component";
import { applicantDataFinder } from "@/src/functions/finder";
import { JunctionApplicant } from "./Junction.component";
import { useAtom, useAtomValue } from "jotai";
import { applicantQuestionsAtom } from "@/src/stores/applicant";
import { APPLICANT_DEVELOPER } from "@/src/constants/applicant/26/developer";
import { APPLICANT_DESIGNER } from "@/src/constants/applicant/26/designer";
import { APPLICANT_MANAGER } from "@/src/constants/applicant/26/manager";

interface ApplicantDetailRightProps {
  data: ApplicantReq[];
}

const ApplicantDetailRight = ({ data }: ApplicantDetailRightProps) => {
  const [applicantData, setApplicantData] = useAtom(applicantQuestionsAtom);

  useEffect(() => {
    const field = applicantDataFinder(data, "field");
    switch (field) {
      case "개발자":
        setApplicantData([
          ...applicantQuestionsAtom.init,
          ...APPLICANT_DEVELOPER,
        ]);
        return;
      case "디자이너":
        setApplicantData([
          ...applicantQuestionsAtom.init,
          ...APPLICANT_DESIGNER,
        ]);
        return;
      case "기획자":
        setApplicantData([
          ...applicantQuestionsAtom.init,
          ...APPLICANT_MANAGER,
        ]);
        return;
    }
  }, []);

  return <ApplicantDetail applicantData={applicantData} data={data} />;
};

interface ApplicantDetailProps {
  applicantData: ApplicantNode[];
  data: ApplicantReq[];
}

const ApplicantDetail = ({ applicantData, data }: ApplicantDetailProps) => {
  return (
    <>
      {applicantData.map((node, index) => (
        <Fragment key={index}>
          <div className="flex gap-2">
            <Txt typography="h5">{`${node.id}. ${node.title}`}</Txt>
          </div>
          <JunctionApplicant applicantNodeData={node} data={data} />
        </Fragment>
      ))}
      <ApplicantTimelineNode postId={applicantDataFinder(data, "id")} />
    </>
  );
};

export default ApplicantDetailRight;
