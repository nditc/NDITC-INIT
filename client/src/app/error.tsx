"use client";

import { useEffect } from "react";
import Error from "@/components/Error";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Error
      code={500}
      msg={"Something went wrong!"}
      handle={() => {
        reset();
      }}
      handleText="Try Again"
    />
  );
}
