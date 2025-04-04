import React from "react";
import EventCards from "@/components/Events/EventCards";
import Styles from "@/styles/eventGrid.module.css";
import { TbMessageCircleCheck } from "react-icons/tb";
import { getAllCategories } from "@/api/events";
import categoryIcons from "@/data/categoryIcons";
import Link from "next/link";

const grid = [
  "large",
  "small",
  "medium",
  "medium",
  "small",
  "large",
  "medium",
  "medium",
];

const EventGrid = async () => {
  const { result } = await getAllCategories();

  return (
    <>
      <h2 className="title title-top mb-6">OUR SEGMENTS</h2>
      <div
        className={
          "container-c grid grid-cols-2 justify-center gap-4 md:gap-8 " +
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
      <div className="mb-16 mt-8 flex items-center justify-center">
        <Link
          href={"/events"}
          className={
            "btn-prim leading-0 mt-2 bg-secondary-400 px-5 pb-2.5 pt-2 text-lg before:bg-secondary-500 xsm:px-6"
          }
        >
          See All Events
        </Link>
      </div>
    </>
  );
};

export default EventGrid;
