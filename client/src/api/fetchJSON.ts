import _ from "lodash";
import { so } from "./requests";

const fetchJSON = async (
  url: string,
  options?: RequestInit,
  data?: any,
  formData?: any,
  error?: (error: any) => void,
) => {
  let modifiedURL = url;
  let modifiedOptions = options;
  let defaultHeaders = {
    mode: "cors",
  };
  if (
    (options?.method === "POST" ||
      options?.method === "PUT" ||
      options?.method === "PATCH") &&
    !formData
  ) {
    modifiedOptions = _.merge(
      {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      },
      defaultHeaders,
      options,
    );
  } else if (
    (options?.method === "POST" ||
      options?.method === "PUT" ||
      options?.method === "PATCH") &&
    formData
  ) {
    modifiedOptions = _.merge(
      {
        body: data,
      },
      defaultHeaders,
      options,
    );
  } else {
    modifiedURL = url + "?" + new URLSearchParams(data);
  }

  console.log(modifiedURL);

  console.log(modifiedOptions);
  const response = await fetch(modifiedURL, modifiedOptions);
  const json = await response.json();

  if (json.succeed || response.ok) {
    return json;
  } else {
    if (error) {
      error(json);
    }

    if (response.status >= 500) {
      throw new Error();
    } else {
      console.error({ msg: json.msg, status: response.status });
      throw new Error(json.msg);
    }
  }
};

export default fetchJSON;
