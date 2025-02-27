import { CURRENT_GENERATION } from "@/src/constants";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import { atom } from "jotai";

/**
 * @description
 * 사용자가 현재 위치한 질문의 id를 저장하는 atom
 */
export const applicationIndexAtom = atom(0);

const applicationQuestions =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION as ApplicationQuestion[];

/**
 * @description
 * 질문 리스트. 선택한 직군에 따라서 동적으로 변경됨
 */
export const applicationDataAtom = atom(applicationQuestions);

const applicationNavbar =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION_NAVBAR as {
    id: number;
    title: string;
  }[];

export const applicationNavbarAtom = atom(applicationNavbar);
