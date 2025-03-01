import { ApplicantPassState } from "../../../src/apis/kanban";

export interface BoardData {
  id: string;
  title: string;
  subElements: string[];
  time?: Date;
  passState?: ApplicantPassState;
}
