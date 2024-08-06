"use client";
import "@/styles/horizontalScroll.css";
import { useEffect, useRef, ReactNode } from "react";

const HorizontalInfiniteScroll = ({ children }: { children: ReactNode }) => {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // If a user hasn't opted in for recuded motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      if (scroller.current) {
        // add data-animated="true" to scroller container` on the page
        scroller.current.setAttribute("data-animated", "true");

        const scrollerInner: any = scroller.current.children[0];
        const scrollerContent = Array.from(
          scroller.current.children[0].children,
        );

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item: any) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, []);

  return (
    <div ref={scroller} className="scroller w-full" data-speed="slow">
      <ul className="tag-list scroller__inner">{children}</ul>
    </div>
  );
};

export default HorizontalInfiniteScroll;
