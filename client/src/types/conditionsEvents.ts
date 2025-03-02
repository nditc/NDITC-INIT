export type conditionStateType = {
  team: boolean;
  paid: boolean;
  gift: boolean;
  snacks: boolean;
  lunch: boolean;
  prize: boolean;
};

export const conditionState = {
  team: false,
  paid: false,
  gift: false,
  snacks: false,
  lunch: false,
  prize: false,
  submission: false,
  descPrev: "",
  rulesPrev: "",
};

export type actions = {
  type: "SET" | "CLEAR" | "TOGGLE" | "ALL";
  field?: string;
  value?: boolean | string | any;
};

export const conditionStateVal = [
  "paid",
  "team",
  "submission",
  "prize",
  "gift",
  "snacks",
  "lunch",
];
