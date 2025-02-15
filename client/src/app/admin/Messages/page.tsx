import React from "react";
import Intro from "@/components/Messages/Intro";
import MessageBox from "@/components/Messages/msgBox";
import ReplyBox from "@/components/Messages/ReplyBox";

const ParentComponent = () => {
  return (
    <div>
      <Intro />
      <MessageBox />
      <ReplyBox />
    </div>
  );
};

export default ParentComponent;
