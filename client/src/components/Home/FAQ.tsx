"use client";
import React, { useState } from "react";

type FaqType = { question: string; answer: string };

const FAQ = ({ FAQS }: { FAQS: FaqType[] }) => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  return (
    <>
      {(FAQS || []).map((data, index) => (
        <div key={index}>
          <h2 className="Inter text-base font-normal sm:text-lg">
            <button
              onClick={() =>
                setOpenIndex((s) => (s === index + 1 ? 0 : index + 1))
              }
              type="button"
              className={`flex w-full items-center justify-between gap-3 border bg-secondary-700/75 p-5 font-bold text-white/75 hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-400/15 rtl:text-right ${
                index !== FAQS.length - 1 || openIndex === index + 1
                  ? "border-b-0"
                  : ""
              } border-white/5 ${
                index === 0
                  ? "rounded-t-xl"
                  : index === FAQS.length - 1 && openIndex !== index + 1
                    ? "rounded-b-xl"
                    : ""
              } `}
            >
              <span className="font-normal">{data.question}</span>
              <svg
                className={`h-3 w-3 ${
                  openIndex === index + 1 ? "rotate-180" : "-rotate-90"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div>
            <div
              style={{
                display: openIndex === index + 1 ? "block" : "none",
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
    </>
  );
};

export default FAQ;
