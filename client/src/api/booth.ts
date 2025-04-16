import fetchJSON from "./fetchJSON";
import reqs from "./requests";

export const BoothLogin = async (data: any) => {
  const res = await fetchJSON(
    reqs.QR_LOGIN,
    {
      method: "POST",
      credentials: "include",
    },
    data,
  );

  return res;
};

export const IsBoothLoggedIn = async () => {
  const res = await fetchJSON(reqs.QR_USER, {
    credentials: "include",
  });

  return res;
};

export const getBoothPar = async (code: any) => {
  const res = await fetchJSON(reqs.QR_SCAN_INFO + code, {
    method: "POST",
    credentials: "include",
  });

  console.log(res);

  return res;
};
