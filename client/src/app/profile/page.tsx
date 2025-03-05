"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileDashboard from "@/components/Profile/ProfileDashboard";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { useState } from "react";
import ExtendedColors from "../../../color.config";
import PaymentStatus from "@/components/Profile/PaymentStatus";
import PerticipatedSegments from "@/components/Profile/PerticipatedSegments";



export default function Page() {

  return (
    <main className="max-w-screen bg-primary-900 relative overflow-x-clip text-primary-200">
      <section className="container-c mb-32 mt-80 flex min-h-screen w-full flex-col gap-6 antialiased">
        <Spotlight
          className="-top-40 left-0 md:-top-64 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <ProfileCard />
        <ProfileDashboard />
        <PerticipatedSegments />
        <PaymentStatus />
      </section>
    </main>
  );
}
