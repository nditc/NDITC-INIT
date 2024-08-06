import reqs from "./requests";

export const sendMessage = (Form: HTMLFormElement) => {
  const form = Array.from(new FormData(Form));
  let data: any = {};
  form.forEach((s) => {
    data[s[0]] = s[1];
  });
  fetch(reqs.SEND_CONTACT_MESSAGE_CLIENT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
