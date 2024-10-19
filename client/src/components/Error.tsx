"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Error = ({
  msg,
  code,
  handle,
  handleText,
  href,
}: {
  msg: string;
  code: number;
  handle?: () => void;
  href?: string;
  handleText?: string;
}) => {
  const Router = useRouter();
  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-br from-secondary-700/10 to-secondary-300/20">
      <h2 className="abs-center mb-2 scale-[2] text-center text-9xl text-primary-150/10">
        {code}
      </h2>
      <h2 className="Inter z-10 mb-2 mt-10 text-center text-4xl font-bold">
        {msg}
      </h2>
      <button
        className="z-10 mt-4 rounded-md bg-primary-400 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-500"
        onClick={
          handle ||
          (() => {
            if (!href) {
              Router.back();
            } else {
              Router.push(href);
            }
          })
        }
      >
        {handleText || "Go Back"}
      </button>
    </main>
  );
};

export default Error;
