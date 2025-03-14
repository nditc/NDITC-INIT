import React from "react";
import HorizontalInfiniteScroll from "../ui/HorizontalInfiniteScroll";
import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import { isArray } from "lodash";

const Promotional = async () => {
  const sponsors = await fetchJSON(reqs.GET_ALL_SPONSOR);
  if (sponsors?.succeed) {
    return (
      <div className="flex w-full flex-col items-center bg-opacity-50 bg-[linear-gradient(90deg,_var(--primary-600)_0%,_var(--secondary-600)_40%,_var(--secondary-600)_60%,_var(--primary-600)_100%)] py-3">
        <h1 className="title">Our Partners</h1>
        <HorizontalInfiniteScroll>
          {(sponsors?.result as any[]).map((item, i) => {
            return (
              <img
                src={reqImgWrapper(item.image)}
                key={i}
                style={{
                  minWidth: `calc(100vw / ${sponsors.result.length})`,
                }}
                className={"h-36 object-contain"}
                alt=""
              />
            );
          })}
        </HorizontalInfiniteScroll>
      </div>
    );
  }
};

export default Promotional;
