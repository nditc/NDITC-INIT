import React from "react";
import HorizontalInfiniteScroll from "../ui/HorizontalInfiniteScroll";

const Promotional = () => {
  return (
    <div className="flex w-full flex-col items-center bg-opacity-50 bg-[linear-gradient(90deg,_var(--primary-600)_0%,_var(--secondary-600)_40%,_var(--secondary-600)_60%,_var(--primary-600)_100%)] py-3">
      <h1 className="title">Promotional Partners</h1>
      <HorizontalInfiniteScroll>
        <img src="/Promotional/1.png" className="h-36" alt="" />
        <img src="/Promotional/2.png" className="h-36" alt="" />
        <img src="/Promotional/3.png" className="h-36" alt="" />
        <img src="/Promotional/4.png" className="h-36" alt="" />
        <img src="/Promotional/5.png" className="h-36" alt="" />
        <img src="/Promotional/6.jpeg" className="h-36" alt="" />
        <img src="/Promotional/7.jpeg" className="h-36" alt="" />
        <img src="/Promotional/8.png" className="h-36" alt="" />
        <img src="/Promotional/9.png" className="h-36" alt="" />
        <img src="/Promotional/10.jpeg" className="h-36" alt="" />
      </HorizontalInfiniteScroll>
    </div>
  );
};

export default Promotional;
