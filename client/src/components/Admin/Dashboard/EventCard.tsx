import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar, FaRegCalendarCheck } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TbCoinTakaFilled } from "react-icons/tb";
import "./Dashboard.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

interface CardProps {
  title: string;
  date: string;
  location: string;
  fee: number;
  type: string;
  description: string;
  imageUrl: string;
}

const EventCard: React.FC<CardProps> = ({
  title,
  date,
  location,
  fee,
  type,
  description,
  imageUrl,
}) => {
  return (
    <div className="EventCardGrad group relative my-5 flex flex-col items-center gap-6 rounded-lg border-2 border-secondary-500 p-5 text-white shadow-lg md:flex-row md:gap-10">
      <div className="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <Link
          href={`/admin/dashboard/edit-event`}
          className="pointer-events-auto"
        >
          <FiEdit className="text-2xl" />
        </Link>
        <button className="pointer-events-auto">
          <MdDelete className="text-3xl text-red-600" />
        </button>
      </div>
      {/* Image Section */}
      <div className="w-full md:w-2/5 lg:w-1/4">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full flex-1">
        {/* Title and Actions */}
        <div className="flex flex-col items-start justify-between md:flex-row">
          <p className="text-2xl font-bold text-primary-150 md:text-4xl">
            {title.split(" ")[0]}
            <span className="text-primary-350">
              {" "}
              {title.split(" ").slice(1).join(" ")}
            </span>
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <button className="text-secondary hover:opacity-80">
              <i className="fas fa-edit text-lg"></i>
            </button>
            <button className="text-red-500 hover:opacity-80">
              <i className="fas fa-trash text-lg"></i>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-2 flex flex-col items-start gap-2 text-sm text-gray-400 md:flex-row md:items-center md:gap-4 md:text-lg">
          <span className="flex items-center gap-1 text-primary-200">
            <FaRegCalendarCheck className="text-xl text-primary-500" />
            {date}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <IoLocationOutline className="text-xl text-primary-500" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <BsFillPeopleFill className="text-xl text-primary-500" />
            {type}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <TbCoinTakaFilled className="text-2xl text-primary-300 md:text-4xl" />
            {fee}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-sm text-lg font-light text-secondary-300 md:text-2xl">
          {description}
        </p>

        {/* Registration Status */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="toggle-checkbox" />
            <label className="md:text-md text-sm font-bold">
              Registration Status
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="toggle-checkbox" />
            <label className="md:text-md text-sm font-bold">
              Registration Status
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
