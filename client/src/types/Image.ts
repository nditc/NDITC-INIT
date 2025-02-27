export type ImageState = {
  edit: boolean;
  add: boolean;
  data?: any;
  delete?: number;
};
export type ImageAction = {
  type: "EDIT" | "ADD" | "DELETE";
  data?: any;
  state: boolean;
  delete?: number;
};
