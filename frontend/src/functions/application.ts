import { ApplicationQuestion } from "../constants/application/type";

export const groupRequiredNamesByQuestionId = (
  data: ApplicationQuestion[]
): Record<number | string, string[]> => {
  const requiredNamesByQuestionId: Record<number | string, string[]> = {};

  // 각 질문 객체를 순회
  data.forEach((question) => {
    const id = question.id;
    requiredNamesByQuestionId[id] = [];

    if (question.nodes) {
      extractRequiredNamesFromNodes(
        question.nodes,
        requiredNamesByQuestionId[id],
        question.require
      );
    }
  });

  return requiredNamesByQuestionId;
};

function extractRequiredNamesFromNodes(
  nodes: any[],
  namesArray: string[],
  parentRequired: boolean = false
): void {
  nodes.forEach((node) => {
    // 노드가 필수인지 확인 (직접 지정되었거나 부모로부터 상속됨)
    const isRequired =
      node.require === true || (parentRequired && node.require !== false);

    // 1. 필수이고 name이 있는 경우 추가
    if (isRequired && node.name && node.name !== "") {
      namesArray.push(node.name);
    }

    // 2. checkboxWithEtc 타입이고 필수인 경우 channelEtc도 필수로 간주
    if (node.type === "checkboxWithEtc" && isRequired && node.name) {
      namesArray.push(`${node.name}Etc`);
    }

    // 3. 중첩된 nodes가 있는 경우 재귀 호출
    if (Array.isArray(node.nodes)) {
      extractRequiredNamesFromNodes(node.nodes, namesArray, isRequired);
    }

    // 4. subNodes가 있는 경우 재귀 호출 (radioByTwoRank, booleanTextarea 등)
    if (Array.isArray(node.subNodes)) {
      extractRequiredNamesFromNodes(node.subNodes, namesArray, isRequired);
    }
  });
}
