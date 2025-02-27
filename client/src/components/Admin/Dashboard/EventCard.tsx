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
    <div className="relative group my-5 flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-primary text-white p-5 rounded-lg shadow-lg bg-gradient-to-b from-primary-550/95 to-primary-650/50 border-2 border-secondary-500">
      <div className="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-2 transition-opacity opacity-0 duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
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
          className="rounded-lg object-cover w-full  h-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full">
        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <p className="text-2xl md:text-4xl font-bold text-primary-150">
            {title.split(" ")[0]}
            <span className="text-primary-350"> {title.split(" ").slice(1).join(" ")}</span>
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="text-secondary hover:opacity-80">
              <i className="fas fa-edit text-lg"></i>
            </button>
            <button className="text-red-500 hover:opacity-80">
              <i className="fas fa-trash text-lg"></i>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="text-sm md:text-lg text-gray-400 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mt-2">
          <span className="flex items-center gap-1 text-primary-200">
            <FaRegCalendarCheck className="text-primary-500 text-xl" />
            {date}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <IoLocationOutline className="text-primary-500 text-xl" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <BsFillPeopleFill className="text-primary-500 text-xl" />
            {type}
          </span>
          <span className="flex items-center gap-1 text-primary-200">
            <TbCoinTakaFilled className="text-primary-300 text-2xl md:text-4xl" />
            {fee}
          </span>
        </div>

        {/* Description */}
        <p className="text-lg md:text-2xl mt-4 text-secondary-300 font-light max-w-sm">
          {description}
        </p>

        {/* Registration Status */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="toggle-checkbox" />
            <label className="font-bold text-sm md:text-md">Registration Status</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="toggle-checkbox" />
            <label className="font-bold text-sm md:text-md">Registration Status</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;