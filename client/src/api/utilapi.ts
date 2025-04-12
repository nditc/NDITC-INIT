import fetchJSON from "./fetchJSON";

// const so = 'https://eventapi.nditc.net';
export const KEY = process.env.NEXT_PUBLIC_UTILAPI_KEY;
export const base = process.env.NEXT_PUBLIC_UTILAPI_LINK;

const wrap_url = (url: string) => {
  return base + url + "?api_key=" + KEY;
};

export const downloadJSONtoXLSX = async (json: any, type: string) => {
  const response = await fetchJSON(
    wrap_url("/json-to-xlsx/2"),
    {
      method: "POST",
    },
    json,
  );

  const a = document.createElement("a");
  a.href = response?.url;

  a.download = "export_json_" + type;

  a.click();

  a.remove();
};
