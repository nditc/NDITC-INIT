import React from "react";
import Intro from "/workspaces/NDITC-INIT/client/src/components/Messages/Intro";
import MessageBox from "/workspaces/NDITC-INIT/client/src/components/Messages/msgBox";
import ReplyBox from "/workspaces/NDITC-INIT/client/src/components/Messages/ReplyBox";

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
