import fetchJSON from "./fetchJSON";
// @ts-ignore

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

export const downloadHTMLtoPDF = async (html: any, type: string) => {
  var opt = {
    margin: 0,
    filename: "admit_card.pdf",
    image: { type: "jpeg", quality: 0.8 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "p" },
  };

  if (window) {
    //@ts-ignore
    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf().set(opt).from(html).toContainer().save();
  }
  // const a = document.createElement("a");
  // a.href = response?.url;

  // a.download = "export_json_" + type;

  // a.click();

  // a.remove();
};
