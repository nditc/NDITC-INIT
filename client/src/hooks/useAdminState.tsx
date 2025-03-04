import { AdminStateAction, AdminStateType } from "@/types/Image";
import { useReducer } from "react";

const useAdminState = () => {
  const state = useReducer(
    (prevState: AdminStateType, action: AdminStateAction) => {
      switch (action.type) {
        case "ADD":
          return { ...prevState, add: action.state };
        case "EDIT":
          return { ...prevState, edit: action.state, data: action.data };
        case "DELETE":
          return { ...prevState, delete: Math.random() };
        default:
          return { ...prevState, add: true };
      }
    },
    {
      edit: false,
      add: false,
      delete: 0,
    },
  );

  return state;
};

export default useAdminState;
