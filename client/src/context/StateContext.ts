import { AdminStateAction, AdminStateType } from "@/types/Image";
import { createContext, Dispatch } from "react";

const StateContext = createContext<
  [AdminStateType, Dispatch<AdminStateAction>] | null
>(null);

export default StateContext;
