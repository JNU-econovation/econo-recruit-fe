import { CURRENT_GENERATION } from "@/src/constants";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import { atom } from "jotai";

export const applicationIndexAtom = atom(0);

const applicationQuestions =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION as ApplicationQuestion[];

export const applicationDataAtom = atom(applicationQuestions);

const applicationNavbar =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION_NAVBAR as {
    id: number;
    title: string;
  }[];

export const applicationNavbarAtom = atom(applicationNavbar);
