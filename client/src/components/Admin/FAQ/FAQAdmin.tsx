"use client";
import StateContext from "@/context/StateContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ConfirmClose from "@/components/ConfirmClose";
import { FiEdit } from "react-icons/fi";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { MdDelete } from "react-icons/md";

type FaqType = { question: string; answer: string; order: number; id: number };

const FAQAdmin = ({ FAQS }: { FAQS: FaqType[] }) => {
  const [s, dispatch] = useContext(StateContext) || [, () => {}];
  return (
    <div className="mt-8">
      {(FAQS || []).map((data, index) => (
        <div key={index}>
          <h2 className="Inter text-base font-normal sm:text-lg">
            <button
              type="button"
              className={`flex w-full items-center justify-between gap-3 border bg-secondary-700/75 p-5 font-bold text-white/75 rtl:text-right ${"border-b-0"} border-white/5 ${
                index === 0 && "rounded-t-xl"
              } `}
            >
              <span className="font-normal">{data.question}</span>

              <div className="flex items-center">
                {" "}
                <span className="mr-2.5 text-xs">Order: {data.order}</span>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "EDIT", state: true, data });
                  }}
                  className="pointer-events-auto"
                >
                  <FiEdit className="text-1xl" />
                </button>
                <button
                  onClick={() => {
                    toast.warning(
                      <ConfirmClose
                        deleteAction={async () => {
                          try {
                            await fetchJSON(reqs.DELETE_FAQ + data?.id, {
                              method: "DELETE",
                              credentials: "include",
                            });
                            dispatch({ type: "DELETE", state: false });
                            toast.success("FAQ Deleted Successfully.");
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
                  className="pointer-events-auto"
                >
                  <MdDelete className="text-2xl text-red-600" />
                </button>
              </div>
            </button>
          </h2>
          <div>
            <div
              style={{
                display: "block",
              }}
              className={`border bg-secondary-700/50 p-5 transition-all ${
                index !== FAQS.length - 1 ? "border-b-0" : "rounded-b-xl"
              } overflow-hidden border-white/5`}
            >
              <p className="mb-2 text-white/60">{data.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAdmin;
