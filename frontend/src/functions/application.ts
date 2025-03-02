/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationQuestion } from "../constants/application/type";

/**
 * @param data ApplicationQuestion[] : 질문 데이터
 * @returns Record<number | string, string[]> : 질문 id를 key로 필수 질문의 name을 value로 가지는 객체
 * @description 질문 데이터에서 필수 질문의 name(localstorage에 저장할 때 key값)을 추출하여 질문 id를 key로 하는 객체를 반환
 */
export const groupRequiredNamesByQuestionId = (
  data: ApplicationQuestion[]
): Record<number | string, string[]> => {
  const requiredNamesByQuestionId: Record<number | string, string[]> = {};

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
    const isRequired =
      node.require === true || (parentRequired && node.require !== false);

    if (isRequired && node.name && node.name !== "") {
      namesArray.push(node.name);
    }

    if (node.type === "checkboxWithEtc" && isRequired && node.name) {
      namesArray.push(`${node.name}Etc`);
    }

    if (Array.isArray(node.nodes)) {
      extractRequiredNamesFromNodes(node.nodes, namesArray, isRequired);
    }

    if (Array.isArray(node.subNodes)) {
      extractRequiredNamesFromNodes(node.subNodes, namesArray, isRequired);
    }
  });
}
