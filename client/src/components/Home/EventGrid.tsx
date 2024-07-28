import React from "react";
import EventCards from "@/components/Events/EventCards";
import Styles from "@/styles/eventGrid.module.css";
import { TbMessageCircleCheck } from "react-icons/tb";

const EventGrid = () => {
  return (
    <div
      className={
        "container mb-16 grid grid-cols-2 justify-center gap-8 " +
        Styles.eventGrid
      }
    >
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["small"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["large"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["medium"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["medium"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["small"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["small"]}
      />
      <EventCards
        icon={<TbMessageCircleCheck className="text-5xl text-primary-400" />}
        className={Styles["small"]}
      />
    </div>
  );
};

export default EventGrid;
