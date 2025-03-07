import TextArea from "@/components/ui/form/Textarea";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

// MessageCard Component
const MessageCard = ({ message }) => {
  return (
    <div className="bg-gradient-to-r from-primary-550 to-primary-550 text-white p-3 md:p-6 rounded-2xl shadow-2xl  mx-auto mb-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-between flex-col lg:flex-row gap-2 md:gap-4">
          <div className="mx-auto text-center md:text-left md:mx-0">
            <p className="text-2xl font-semibold">{message.name}</p>
            <p className="text-sm text-gray-400">{message.college}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mt-1">
            <FaEnvelope className="text-primary-250 text-3xl" />
            <span>{message.email}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="text-gray-400 text-sm ">{message.date}</span>
          <button className="bg-primary-400 hover:bg-primary-500 px-12 py-2 rounded-3xl text-white">
            Ignore
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 text-gray-200">
        {/* Message Section */}
        <div className="mt-4">
          <p className="text-2xl text-primary-250 font-semibold">Message</p>
          <p className="text-sm mt-2">{message.text}</p>
        </div>

        {/* Reply Section */}
        <div className="mt-4 rounded-xl relative">
          <TextArea
          rows={6}
            placeholder="Reply"
            divClass="h-full"
            className="h-full"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-2xl hover:text-white">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageCard;