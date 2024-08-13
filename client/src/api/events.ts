import fetchJSON from "@/api/fetchJSON";
import reqs from "./requests";

export const getAllCategories = async () => {
  const response = await fetchJSON(reqs.ALL_CATEGORIES, { cache: "no-store" });
  return response;
};

export const getAllEventwithCategories = async () => {
  const response = await fetchJSON(
    reqs.ALL_CATEGORIES,
    {
      cache: "no-store",
    },
    { populateEvents: true },
  );
  // console.log(response.result);
  return response;
};

export const getEvent = async (value: string) => {
  const response = await fetchJSON(reqs.SINGLE_EVENT + value, {
    cache: "no-store",
  });
  return response;
};
