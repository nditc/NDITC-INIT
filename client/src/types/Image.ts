export type ImageState = {
  edit: boolean;
  add: boolean;
  data?: any;
};
export type ImageAction = {
  type: "EDIT" | "ADD";
  data?: any;
  state: boolean;
};
