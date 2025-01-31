import {
  ApplicationNode,
  type ApplicationQuestion,
} from "@/src/constants/application/type";
import { JunctionQuestion } from "./Junction.component";
import { ApplicationLayout } from "./Layout.component";

const checkQuestion = (
  node: ApplicationQuestion | ApplicationNode
): node is ApplicationQuestion => {
  return "id" in node;
};

interface JunctionOrLayoutProps {
  node: ApplicationQuestion | ApplicationNode;
}
export const JunctionOrLayout = ({ node }: JunctionOrLayoutProps) => {
  return checkQuestion(node) ? (
    <ApplicationLayout applicationQuestion={node} />
  ) : (
    <JunctionQuestion applicationNodeData={node} />
  );
};
