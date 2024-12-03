export function parseConditionalJSON(str: string) {
  try {
    console.log("_______" + str);
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
}
