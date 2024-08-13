import React from "react";

const DetailCard = ({
  icon,
  text,
  title,
}: {
  icon: React.ReactNode;
  text: string;
  title: string;
}) => {
  return (
    <div className="flex w-full basis-1/2 gap-3 rounded-full bg-secondary-400/30 px-8 py-3">
      {icon}
      <div className="align-center -mt-1 flex flex-col justify-center gap-1">
        <p className="text-sm font-medium leading-none text-primary-200 xl:text-base">
          {title}
        </p>
        <p className="text-base leading-none xl:text-xl">{text}</p>
      </div>
    </div>
  );
};

export default DetailCard;
