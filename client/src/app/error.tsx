"use client";

import { useEffect } from "react";
import Error from "@/components/Error";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { sentenceCase } from "change-case";

const parse = () => {};

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  let ErrorData = parseConditionalJSON(error.message.split("&&&&&")[0] || "");

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Error
      code={ErrorData?.status || 500}
      msg={
        sentenceCase(ErrorData?.msg) ||
        sentenceCase(error.message) ||
        "Something went wrong!"
      }
      handle={() => {
        reset();
      }}
      handleText="Try Again"
    />
  );
}
