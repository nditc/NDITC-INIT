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

export const getFullData = async (id: string) => {
  // this function should be only be runned in client
  const response = await fetchJSON(reqs.FULL_SINGLE_DATA_CLIENT + id, {
    credentials: "include",
  });

  return response;
};

export const logOut = async () => {
  // this function should be only be runned in client
  const response = await fetchJSON(reqs.CLIENT_LOGOUT, {
    credentials: "include",
  });

  return response;
};

export const register = async (data: any) => {
  // this function should be only be runned in client
  const response = await fetchJSON(
    reqs.PAR_REG,
    {
      credentials: "include",
      method: "POST",
    },
    data,
    true,
  );

  return response;
};
