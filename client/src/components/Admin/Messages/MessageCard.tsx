import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import TextArea from "@/components/ui/form/Textarea";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

// MessageCard Component
const MessageCard = ({
  message,
  forceUp,
}: {
  message: any;
  forceUp: () => void;
}) => {
  const [replyText, setReplyText] = useState("");
  const [replied, setReplied] = useState(message?.replied);

  const handleSubmit = async () => {
    await toast.promise(
      fetchJSON(
        reqs.EMAIL_MESSAGE + "contact",
        {
          method: "POST",
          credentials: "include",
        },
        {
          text: replyText,
          email: message?.email,
          name: message?.name,
          subject: "Reply to Your Contact Us Request",
        },
      ),
      {
        pending: "Message is being sent.",
        success: "Message sent.",
        error: "Message can't be sent.",
      },
    );

    forceUp();
    setReplied(true);
  };

  return (
    <div className="mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary-550 to-primary-550 p-3 text-white shadow-2xl md:p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="items-between flex flex-col gap-2 md:gap-4 lg:flex-row">
          <div className="mx-auto text-center md:mx-0 md:text-left">
            <p className="text-2xl font-semibold">{message.name}</p>
            <p className="text-sm text-white/50">{message.institute}</p>
          </div>
          <div className="mt-1 flex items-center gap-2 text-gray-300">
            <FaEnvelope className="text-3xl text-primary-250" />
            <span>{message.email}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <span className="text-sm text-white/50">
            {new Date(message.createdAt).toString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-gray-200 md:grid-cols-2 md:gap-5">
        {/* Message Section */}
        <div className="mt-4">
          <p className="text-2xl font-semibold text-primary-250">Message</p>
          <p className="mt-2 text-sm">{message.message}</p>
        </div>

        {/* Reply Section */}
        <div className="relative mt-4 rounded-xl">
          {!replied ? (
            <>
              <TextArea
                rows={6}
                placeholder="Reply"
                divClass="h-full"
                className="h-full"
                value={replyText}
                onChange={(e) => {
                  setReplyText(e.currentTarget.value);
                }}
              />
              <button
                onClick={handleSubmit}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-gray-300 hover:text-white"
              >
                ➤
              </button>
            </>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-white/10 text-white/50">
              Replied
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MessageCard;
