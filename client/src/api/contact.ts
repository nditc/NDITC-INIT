// import reqs from "./requests";
import reqs from "./requests";
import fetchJSON from "./fetchJSON";

//client calling
export const sendMessage = async (data: any) => {
  const response = await fetchJSON(
    reqs.SEND_CONTACT_MESSAGE_CLIENT,
    {
      method: "POST",
    },
    data,
  );
};
