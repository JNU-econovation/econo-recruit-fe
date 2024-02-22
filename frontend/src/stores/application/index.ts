import { CURRENT_GENERATION } from "@/src/constants";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import { atom } from "jotai";
import { Dispatch, SetStateAction, createContext } from "react";

export const applicationIndexAtom = atom(0);

export const applicationQuestionsInitData =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION as ApplicationQuestion[];

export const ApplicationQuestionsContext = createContext<
  [ApplicationQuestion[], Dispatch<SetStateAction<ApplicationQuestion[]>>]
>([[], () => {}]);

interface ApplicationNavbarState {
  id: number;
  title: string;
}

export const applicationNavbarInitData =
  require(`@/src/constants/application/${CURRENT_GENERATION}.ts`)
    .APPLICATION_NAVBAR as ApplicationNavbarState[];

export const ApplicationNavbarContext = createContext<
  [ApplicationNavbarState[], Dispatch<SetStateAction<ApplicationNavbarState[]>>]
>([[], () => {}]);
