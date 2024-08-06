export const separateLastWord = (S: string) => {
  const words = S.split(" ");
  const lastword = words.pop();

  return [words.join(" "), lastword];
};

export const separateFirstWord = (S: string) => {
  const words = S.split(" ");
  const firstword = words.reverse().pop();

  return [firstword, words.reverse().join(" ")];
};
