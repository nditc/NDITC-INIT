import { AdminStateAction, AdminStateType } from "@/types/Image";
import { createContext, Dispatch } from "react";

const UserContext = createContext<any | null>(null);

export default UserContext;
