import React from "react";
import EventCards from "@/components/Events/EventCards";
import Styles from "@/styles/eventGrid.module.css";
import { TbMessageCircleCheck } from "react-icons/tb";
import { getAllCategories } from "@/api/events";
import categoryIcons from "@/data/categoryIcons";

const grid = ["large", "small", "medium", "medium", "small", "small", "small"];

const EventGrid = async () => {
  const { result } = await getAllCategories();

  return (
    <>
      <h2 className="title title-top mb-6">OUR SEGMENTS</h2>
      <div
        className={
          "container mb-16 grid grid-cols-2 justify-center gap-4 md:gap-8 " +
          Styles.eventGrid
        }
      >
        {(result || []).map((data: any, index: number) => (
          <EventCards
            key={data.id}
            type="segment"
            icon={React.createElement(categoryIcons[index], {
              className: "text-6xl text-primary-350",
            })}
            data={data}
            className={Styles[grid[index]]}
          />
        ))}
      </div>
    </>
  );
};

export default EventGrid;
