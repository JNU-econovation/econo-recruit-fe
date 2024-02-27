import {
  ApplicationNode,
  ApplicationQuestion,
} from "../constants/application/type";
import { localStorage } from "./localstorage";
import { isApplicationQuestion } from "./validator";

export const getApplicationNames = (
  node: (ApplicationQuestion | ApplicationNode)[],
  applicationName?: Set<string>
) => {
  applicationName ||= new Set<string>();
  node.forEach((element) => {
    if (isApplicationQuestion(element)) {
      return getApplicationNames(element.nodes, applicationName);
    }
    switch (element.type) {
      case "checkbox":
      case "checkboxWithEtc":
      case "radio":
      case "radioForCheck":
      case "text":
      case "textarea":
        if (element.require) {
          applicationName.add(element.name);
        }
        break;
      case "booleanTextarea":
      case "radioByTwoRank":
        if (element.subNodes) {
          element.subNodes.forEach((subNode) => {
            if (subNode.require) {
              applicationName.add(subNode.name);
            }
          });
        }
        break;
      case "justText":
      case "bar":
      case "timeline":
      default:
        break;
    }
  });
  return applicationName;
};

export const getApplicationValues = (node: ApplicationQuestion[]) => {
  const applicationNames = getApplicationNames(node);
  return Array.from(applicationNames).map((name) => ({
    name,
    answer: localStorage.get(name),
  }));
};
