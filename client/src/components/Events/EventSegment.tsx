import React from "react";
import EventCards from "./EventCards";
import categoryIcons from "@/data/categoryIcons";

type SegmentProps = {
  name: string;
  description: string;
  events: any[];
  index: number;
  id: number;
};

const EventSegment = ({
  name,
  description,
  events,
  index,
  id,
}: SegmentProps) => {
  return (
    <div
      id={"s" + id}
      className="w-screen border-b border-primary-150/10 pb-16 pt-12"
    >
      <div className="container">
        <h2 className="Inter title mb-8 text-center font-bold md:text-4xl">
          {React.createElement(categoryIcons[index], {
            className: "icn-inline text-primary-350 mr-3 text-4xl md:text-5xl",
          })}
          {name}
        </h2>
        <div className="gap-4 grid-fluid-fit-[290px] sm:grid-fluid-fit-[350px]">
          {(events || []).map((data, index) => {
            return (
              <EventCards key={data.id} type="event" data={data} className="" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventSegment;
