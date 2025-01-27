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
  const response = await fetchJSON(
    reqs.SINGLE_EVENT + value,
    {
      cache: "no-store",
    },
    null,
  );
  return response;
};

export const single_event_par = async (data: any) => {
  const response = await fetchJSON(
    reqs.SINGLE_EVENT_PARTICIPATION,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );
  return response;
};

export const team_event_par = async (data: any) => {
  const response = await fetchJSON(
    reqs.TEAM_EVENT_PARTICIPATION,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );
  return response;
};

export const submit_event = async (data: any) => {
  const response = await fetchJSON(
    reqs.SUBMIT_LINK + data.eventName,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );
  return response;
};
