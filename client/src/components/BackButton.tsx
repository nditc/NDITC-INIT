import { useRouter } from "next/router";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
    >
      ← Back
    </button>
  );
};

export default BackButton;
