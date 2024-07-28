import React from "react";

type props = {
  text: string;
  val: string;
  rotate: number;
};

const Tags = ({ text, val, rotate }: props) => {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
      className="relative z-0 mt-16 h-[195px] w-[150px]"
    >
      <div className="absolute -top-16 left-1/2 h-16 w-1 -translate-x-1/2 bg-[#504587]"></div>
      <img
        src="/tag.svg"
        className="absolute left-0 right-0 z-0 w-[195px]"
        alt=""
      />
      <div className="abs-center align-center absolute z-20 flex h-full w-full flex-col justify-center text-center leading-none">
        <h3 className="GradTextSilver -mt-3 pt-1 text-8xl leading-[0.8]">
          {val}
        </h3>
        <p className="GradTextSilver">{text}</p>
      </div>
    </div>
  );
};

export default Tags;
