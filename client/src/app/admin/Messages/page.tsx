import React from "react";
import Intro from "/workspaces/NDITC-INIT/client/src/components/Messages/Intro";
import MessageBox from "/workspaces/NDITC-INIT/client/src/components/Messages/msgBox";
import ReplyBox from "/workspaces/NDITC-INIT/client/src/components/Messages/ReplyBox";

const ParentComponent = () => {
  return (
    <div>
      <Intro />
      <MessageBox senderName={""} institution={""} email={""} message={""} sentTime={""} />
      <ReplyBox name={""} institution={""} email={""} sentTime={""} replyTime={""} messageText={""} replyText={""} />
    </div>
  );
};

export default ParentComponent;
