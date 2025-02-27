import fetchJSON from "./fetchJSON";
import reqs from "./requests";

export const apply = async (data: any) => {
  // this function should be only be runned in client
  const response = await fetchJSON(
    reqs.CA_REG,
    {
      credentials: "include",
      method: "POST",
    },
    data,
  );

  return response;
};
