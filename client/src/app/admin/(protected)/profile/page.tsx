import AdminProfileCard from "@/components/Admin/Profile/AdminProfileCard";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import React from "react";
import ExtendedColors from "../../../../../color.config";
import ParticipantsInfoCard from "@/components/Admin/Profile/ParticipantsInfoCard";
import NoticeCard from "@/components/Admin/Profile/NoticeCard";
import MessageCard from "@/components/Admin/Profile/MessageCard";

const page = () => {
  return (
    <main className="max-w-screen bg-primary-900 relative overflow-x-clip text-primary-200">
      <section className="container-c mb-32 mt-80 flex min-h-screen w-full flex-col gap-6 antialiased">
        <AdminProfileCard />
        <ParticipantsInfoCard />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <NoticeCard />
          <MessageCard />
        </div>
      </section>
    </main>
  );
};

export default page;
