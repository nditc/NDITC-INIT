import React from "react";

const DatePicker = ({
  dates,
}: {
  dates: { date: string; month: string }[];
}) => {
  return (
    <div>
      <div className="Bebas">
        <p>{dates[0].date}</p>
        <sup>{dates[0].month}</sup>
      </div>
    </div>
  );
};

export default DatePicker;
