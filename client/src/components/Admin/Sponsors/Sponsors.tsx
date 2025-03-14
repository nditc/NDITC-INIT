import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import ConfirmClose from "@/components/ConfirmClose";
import StateContext from "@/context/StateContext";
import useFetch from "@/hooks/useFetch";
import { isArray } from "lodash";
import React, { useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Sponsors = ({ sponsors }: { sponsors: any[] }) => {
  const [, dispatch] = useContext(StateContext) || [, () => {}];
  return (
    <div className="mb-8 max-w-7xl rounded-2xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 p-4 shadow-lg md:mb-10 md:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-10">
        <p className="mx-auto text-xl font-bold md:mx-0 md:text-2xl">
          Sponsors
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-6 md:mt-14">
        {isArray(sponsors) &&
          sponsors.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-10"
              >
                <div className="mx-auto flex flex-col items-start gap-4 md:mx-0 md:flex-row md:gap-5">
                  <img
                    src={reqImgWrapper(item.image)}
                    alt="Legit Banda Logo"
                    className="mx-auto w-24 rounded-lg md:mx-0 md:w-32 lg:w-36"
                  />
                  <div className="flex flex-col gap-0 md:gap-1">
                    <p className="mx-auto text-base font-semibold md:mx-0 md:text-xl lg:text-xl">
                      {item.type}
                    </p>
                    <p className="mx-auto text-base opacity-70 md:mx-0">
                      {item.name}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-auto text-sm text-primary-200 hover:underline md:mx-0 md:text-base"
                    >
                      {item.link}
                    </a>
                  </div>
                </div>
                <div className="mx-auto flex gap-2 md:mx-0 md:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toast.warning(
                        <ConfirmClose
                          deleteAction={async () => {
                            try {
                              await fetchJSON(reqs.DELETE_SPONSOR + item?.id, {
                                method: "DELETE",
                                credentials: "include",
                              });
                              dispatch({ type: "DELETE", state: false });
                              toast.success("Sponsor Deleted Successfully.");
                            } catch (err) {
                              toast.error(String(err));
                            }
                          }}
                        />,
                        {
                          autoClose: false,
                          position: "bottom-center",
                          closeButton: false,
                          toastId: "close?",
                        },
                      );
                    }}
                    className="rounded-lg p-1 transition-all hover:bg-red-500/20 md:p-2"
                  >
                    <MdDelete className="h-5 w-5 text-red-600 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sponsors;
