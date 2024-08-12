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
