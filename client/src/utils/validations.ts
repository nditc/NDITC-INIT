export const passRegEx = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})",
);

export const mailRegex =
  /^[a-zA-Z0-9._%+-]+@(?:gmail.com|yahoo.com|outlook.com|hotmail.com|icloud.com|protonmail.com|aol.com|zoho.com)$/i;

export const mediumValidPass = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
