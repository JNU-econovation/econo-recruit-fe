const cellPhoneNumberReplacer = (value: string) =>
  value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

const undergradeNumberReplacer = (value: string) =>
  value.replace(/[^0-9]/g, "");

export const minimumIntegerDigits = (value: number, digits: number) =>
  value.toLocaleString("ko-KR", {
    minimumIntegerDigits: digits,
    useGrouping: false,
  });

const scoreNumberReplacer = (value: string): string => {
  const number = parseInt(value);
  if (isNaN(number) || number < 0) return "0";
  if (number > 10) return value[value.length - 1];
  return number.toString();
};

export type ReplacerType =
  | "cellPhoneNumber"
  | "undergradeNumber"
  | "scoreNumber";

export const replacer = (value: string, type: ReplacerType) => {
  switch (type) {
    case "cellPhoneNumber":
      return cellPhoneNumberReplacer(value);
    case "undergradeNumber":
      return undergradeNumberReplacer(value);
    case "scoreNumber":
      return scoreNumberReplacer(value);
    default:
      return value;
  }
};

export const replaceTwoString = (original: number, by: string = "0") =>
  original.toString().padStart(2, by);
