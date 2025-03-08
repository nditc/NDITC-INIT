import { AdminStateAction, AdminStateType } from "@/types/Image";
import { createContext, Dispatch } from "react";

const EventContext = createContext<any | null>(null);

export default EventContext;
