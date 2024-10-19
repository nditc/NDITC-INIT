// import reqs from "./requests";
import reqs from "./requests";
import fetchJSON from "./fetchJSON";

//client calling
export const sendMessage = async (data: any) => {
  const response = await fetchJSON(
    "",
    {
      method: "POST",
    },
    data,
  );
};

export const login = async (data: any) => {
  const response = await fetchJSON(
    reqs.PAR_LOGIN,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );

  if (!response.succeed) {
    throw new Error(response.msg);
  }
  return response;
};

export const loggedInAndData = async () => {
  // this function should be only be runned in client
  const response = await fetchJSON(reqs.LOGGED_CLIENT, {
    credentials: "include",
  });

  return response;
};
