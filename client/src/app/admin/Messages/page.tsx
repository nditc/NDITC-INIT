import React from "react";
import Intro from "@/components/Messages/Intro.tsx";
import MessageBox from "@/components/Messages/msgBox.tsx";
import ReplyBox from "@/components/Messages/ReplyBox.tsx";

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
