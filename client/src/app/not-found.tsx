"use client";

import { useEffect } from "react";
import Error from "@/components/Error";

export default function NotFound() {
  return (
    <Error
      code={404}
      msg={"Not found"}
      handle={() => {
        window.location.href = "/";
      }}
      handleText="Home"
    />
  );
}
