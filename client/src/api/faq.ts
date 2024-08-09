import fetchJSON from "@/api/fetchJSON";
import reqs from "./requests";

export const getAllFAQ = async () => {
  const response = await fetchJSON(reqs.ALL_FAQS, { cache: "no-store" });
  return response;
};
