import fetchJSON from "./fetchJSON";
import reqs from "./requests";

export const AdminLogin = async (data: any) => {
  const res = await fetchJSON(
    reqs.ADMIN_LOGIN,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );

  return res;
};

export const loggedInAdmin = async () => {
  // this function should be only be runned in client
  const response = await fetchJSON(reqs.IS_ADMIN_LOGGED, {
    credentials: "include",
  });

  return response;
};
