import React from "react";

const TriangleBottom = ({ className }: { className?: string }) => {
  return (
    <div className="absolute -bottom-2 inline-block w-4 overflow-hidden">
      <div className="h-2 w-2 origin-top-left -rotate-45 transform bg-primary-550"></div>
    </div>
  );
};

export default TriangleBottom;
