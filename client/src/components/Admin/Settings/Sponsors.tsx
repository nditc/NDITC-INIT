import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Sponsors = () => {
  const [sponsors] = useFetch({
    fn: async () => {
      return await fetchJSON(reqs.GET_ALL_SPONSOR);
    },
  });
  return (
    <div className="mb-8 max-w-7xl rounded-2xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 p-4 shadow-lg md:mb-10 md:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-10">
        <p className="mx-auto text-xl font-bold md:mx-0 md:text-2xl">
          Sponsors
        </p>
        <button className="mx-auto flex w-auto items-center gap-2 rounded-full bg-primary-400 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-300 md:mx-0 md:px-8 md:py-3 md:text-base">
          Add
          <IoAdd className="box-content rounded-full bg-white p-1 text-lg text-primary-550 md:text-xl" />
        </button>
      </div>

      <div className="mx-auto mt-8 max-w-4xl md:mt-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-10">
          <div className="mx-auto flex flex-col items-start gap-4 md:mx-0 md:flex-row md:gap-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/08b2affc9f34db02e12501e58c1a9f2cab900fc28b7c544220a495a6e1c75324?placeholderIfAbsent=true&apiKey=58fe75c70cbc4db68554bc2ed919fb77"
              alt="Legit Banda Logo"
              className="mx-auto w-24 rounded-lg md:mx-0 md:w-32 lg:w-36"
            />
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="mx-auto text-lg font-semibold md:mx-0 md:text-xl lg:text-2xl">
                Engagement Partner
              </p>
              <p className="mx-auto text-base opacity-70 md:mx-0 md:text-lg">
                Legit Banda
              </p>
              <a
                href="https://www.thelegitbanda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto text-sm text-primary-200 hover:underline md:mx-0 md:text-base"
              >
                thelegitbanda.com
              </a>
            </div>
          </div>
          <div className="mx-auto flex gap-2 md:mx-0 md:gap-3">
            <button className="rounded-lg p-1 transition-all hover:bg-white/10 md:p-2">
              <FiEdit className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button className="rounded-lg p-1 transition-all hover:bg-red-500/20 md:p-2">
              <MdDelete className="h-5 w-5 text-red-600 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
