import React from "react";
import DatePicker from "./Picker";

const Schedule = () => {
  return (
    <div className="flex-1">
      <h2 className="title">I&apos;m Schedule</h2>
      <div>
        <DatePicker dates={[{ date: "20", month: "Feb" }]} />
      </div>
    </div>
  );
};

export default Schedule;
