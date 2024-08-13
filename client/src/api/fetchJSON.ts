import _ from "lodash";
import { so } from "./requests";

const fetchJSON = async (
  url: string,
  options?: RequestInit,
  data?: any,
  error?: () => void,
) => {
  let modifiedURL = url;
  let modifiedOptions = options;
  let defaultHeaders = {
    mode: "cors",
  };
  if (
    options?.method === "POST" ||
    options?.method === "PUT" ||
    options?.method === "PATCH"
  ) {
    modifiedOptions = _.merge(
      options,
      {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      },
      defaultHeaders,
    );
  } else {
    modifiedURL = url + "?" + new URLSearchParams(data);
  }

  console.log(modifiedURL);

  const response = await fetch(modifiedURL, modifiedOptions);
  const json = await response.json();
  if (json.succeed || response.ok) {
    return json;
  } else {
    if (error) {
      error();
    }
    throw new Error(json.msg);
  }
};

export default fetchJSON;
