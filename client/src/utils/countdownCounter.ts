const monthDay = (year: number) => {
  const returnArr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //Handle Leap Year
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    returnArr[2] = 29;
  }

  return returnArr;
};

//Zero Prpender Function
const Z = (num: number) => {
  let stringifiedNum = num.toString();
  if (stringifiedNum.length == 1) {
    stringifiedNum = "0" + stringifiedNum;
  }
  return stringifiedNum;
};

const CountdownCounter = (targetDate: Date) => {
  const currentDate = new Date();
  const rpMonths =
    (targetDate.valueOf() - currentDate.valueOf()) / (60 * 60 * 24 * 30 * 1000);

  const months = Math.floor(rpMonths);
  const rpDays = (rpMonths - months) * 30; //Remaining Day with Decimals
  const days = Math.floor(rpDays);
  const rpHours = (rpDays - days) * 24; //Remaining Hours with Decimals
  const hours = Math.floor(rpHours);
  const rpMinutes = (rpHours - hours) * 60; //Remaining Minutes with Decimals
  const minutes = Math.floor(rpMinutes);

  return {
    months: Z(months),
    days: Z(days),
    hours: Z(hours),
    minutes: Z(minutes),
  };
};

export default CountdownCounter;
