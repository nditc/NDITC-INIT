export type AdminStateType = {
  edit: boolean;
  add: boolean;
  data?: any;
  delete?: number;
};
export type AdminStateAction = {
  type: "EDIT" | "ADD" | "DELETE";
  data?: any;
  state: boolean;
  delete?: number;
};
