"use client";
import React, { useEffect, useState } from "react";
import { TitleBox } from "@/components/Admin/Messages/TitleBox";
import MessageCard from "@/components/Admin/Messages/MessageCard";
import fetchJSON from "@/api/fetchJSON";
import { toast } from "react-toastify";
import reqs from "@/api/requests";
import useFetch from "@/hooks/useFetch";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";

export default function MessagesPage() {
  const [forceUp, setForceUp] = useState(0);

  const forceUpdate = () => {
    setForceUp((s) => s + 1);
  };

  const [messages, loading, error] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_CONTACT_MESSAGES, {
          cache: "no-store",
          credentials: "include",
        });
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    },
    [forceUp],
  );

  if (loading) {
    <PageLoading />;
  }

  return (
    <section className="mb-32 mt-40 flex min-h-screen w-full flex-col antialiased">
      <div className="mb-8">
        <TitleBox />
      </div>
      <div className="mb-8 w-full space-y-8">
        {((messages || []) as any[]).reverse().map((msg, index) => (
          <MessageCard key={index} message={msg} forceUp={forceUpdate} />
        ))}
      </div>
    </section>
  );
}
