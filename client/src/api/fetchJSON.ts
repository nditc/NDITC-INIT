const fetchJSON = async (
  url: string,
  options?: RequestInit,
  data?: any,
  error?: () => void,
) => {
  let modifiedURL = url;
  let modifiedOptions = options;

  if (
    options?.method === "POST" ||
    options?.method === "PUT" ||
    options?.method === "PATCH"
  ) {
    modifiedOptions = {
      ...options,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    };
  } else {
    modifiedURL = url + "?" + new URLSearchParams(data);
  }

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
