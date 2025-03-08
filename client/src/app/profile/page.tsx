"use client";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import React from "react";
import ExtendedColors from "@/../color.config";
import useUser from "@/hooks/useUser";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileDashboard from "@/components/Profile/ProfileDashboard";
import ParticipatedSegments from "@/components/Profile/PerticipatedSegments";
import PaymentStatus from "@/components/Profile/PaymentStatus";
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import { getEventKey } from "@/api/events";
import EventContext from "@/context/EventContext";
import CABoard from "@/components/Profile/CABoard";

const Page = () => {
  const [user, loading, error] = useUser(true);
  const [events, evLoading, errorE] = useFetch(
    {
      fn: async () => {
        return await getEventKey();
      },
    },
    [],
  );

  if (loading || evLoading) {
    return <PageLoading />;
  }

  if (error || errorE) {
    return <ErrorC code={500} msg="Something Went Wrong!" handleText="Login" />;
  }

  if (!user && !events) {
    return (
      <ErrorC
        code={403}
        msg="Unauthorized"
        href="/admin/login"
        handleText="Login"
      />
    );
  }
  console.log(user);
  return (
    <main className="max-w-screen bg-primary-900 relative overflow-x-clip text-primary-200">
      <section className="container-c mb-32 mt-36 flex min-h-screen w-full flex-col gap-6 antialiased">
        <Spotlight
          className="-top-40 left-0 md:-top-64 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <EventContext.Provider value={events}>
          <UserContext.Provider value={user}>
            <ProfileCard />
            {/* <ProfileDashboard /> */}
            <ParticipatedSegments />
            {/* <PaymentStatus /> */}
            <CABoard />
          </UserContext.Provider>
        </EventContext.Provider>
      </section>
    </main>
  );
};

export default Page;
