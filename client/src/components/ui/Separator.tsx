import React from "react";

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={"block h-1 w-1 rounded-full bg-primary-200 " + className}
    ></div>
  );
};

export default Separator;
