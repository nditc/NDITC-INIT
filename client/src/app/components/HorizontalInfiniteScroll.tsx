"use client";

import { useEffect } from "react";

const HorizontalInfiniteScroll = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for recuded motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", "true");

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner: any = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item: any) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-3 bg-white">
      <h1 className="text-center GradText text-2xl md:text-5xl mt-5 mb-10">
        Promotional Partners
      </h1>

      <div className="scroller w-full" data-speed="slow">
        <ul className="tag-list scroller__inner">
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
        </ul>
      </div>
    </div>
  );
};

export default HorizontalInfiniteScroll;
