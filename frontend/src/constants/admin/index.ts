export const roleKeys: (keyof typeof roleMap)[] = [
  "ROLE_OPERATION",
  "ROLE_PRESIDENT",
  "ROLE_TF",
  "ROLE_GUEST",
];

export const roleUpdateMap = {
  ROLE_OPERATION: "OPERATION",
  ROLE_PRESIDENT: "PRESIDENT",
  ROLE_TF: "TF",
  ROLE_GUEST: "GUEST",
} as const;

export const roleMap = {
  ROLE_OPERATION: "관리자",
  ROLE_PRESIDENT: "회장단",
  ROLE_TF: "TF",
  ROLE_GUEST: "게스트",
} as const;
