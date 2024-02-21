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

// FIXME: 타입 오타 수정 바람 (Junctin -> Junction)
interface JunctinOrLayoutProps {
  node: ApplicationQuestion | ApplicationNode;
}
// FIXME: 컴포넌트 오타 수정 바람 (Junctin -> Junction)
export const JunctinOrLayout = ({ node }: JunctinOrLayoutProps) => {
  return checkQuestion(node) ? (
    <ApplicationLayout applicationQuestion={node} />
  ) : (
    <JunctionQuestion applicationNodeData={node} />
  );
};
