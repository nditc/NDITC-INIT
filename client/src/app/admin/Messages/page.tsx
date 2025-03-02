import React from "react";
import {TitleBox} from "@components/Messages/TitleBox.tsx";
import {MessageBox} from "@components/Messages/MsgBox.tsx";
import {ReplyBox} from "@components/Messages/ReplyBox.tsx";

export default function MessagesPage() {
  // Example data - replace with actual props from your application
  const messageData = {
    name: "John Doe",
    institution: "ndc",
    email: "exa.edu@gmail.com",
    timestamp: "31 December, 2023; 3:00 pm",
    message: "Original message text goes here...",
  };

  const replyData = {
    sentTime: "31 December, 2023; 3:00 pm",
    replyTime: "1 January, 2024; 10:00 am",
    originalMessage: "Original message text goes here...",
    replyMessage: "This is the user's reply message...",
  };

  return (
    <div className="p-8 bg-primary-650 min-h-screen">
      {/* Title Box */}
      <div className="mb-8">
        <TitleBox />
      </div>

      {/* Reply Box */}
      <div className="mb-6">
        <ReplyBox
          {...messageData}
          {...replyData}
        />
      </div>

      {/* Message Box */}
      <MessageBox
        {...messageData}
      />
    </div>
  );
}