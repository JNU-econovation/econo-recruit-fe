import {
  ApplicationNode,
  ApplicationQuestion,
} from "../constants/application/type";
import { localStorage } from "./localstorage";
import { isApplicationQuestion, isEmail } from "./validator";

export const getApplicationNames = (
  node: (ApplicationQuestion | ApplicationNode)[],
  requirement: boolean = true,
  applicationName?: Set<string>
) => {
  const applicationNameSet = applicationName || new Set<string>();
  node.forEach((element) => {
    if (isApplicationQuestion(element)) {
      return getApplicationNames(
        element.nodes,
        requirement,
        applicationNameSet
      );
    }
    switch (element.type) {
      case "checkbox":
      case "checkboxWithEtc":
      case "radio":
      case "radioForCheck":
      case "text":
      case "textarea":
        if (!requirement || element.require) {
          applicationNameSet.add(element.name);
        }
        break;
      case "booleanTextarea":
        applicationNameSet.add(element.name);
      case "radioByTwoRank":
        if (element.subNodes) {
          element.subNodes.forEach((subNode) => {
            if (!requirement || subNode.require) {
              applicationNameSet.add(subNode.name);
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
  return applicationNameSet;
};

export const getApplicationValues = (node: ApplicationQuestion[]) => {
  const applicationNames = getApplicationNames(node, false);
  return Array.from(applicationNames).map((name) => {
    const value = localStorage.get(name, "");
    return {
      name,
      answer: value ? value : "",
    };
  });
};
