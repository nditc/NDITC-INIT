"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "@/../color.config";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import fetchJSON from "@/api/fetchJSON";
import { loggedInAdmin } from "@/api/admin";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import { usePathname } from "next/navigation";
import { IsBoothLoggedIn } from "@/api/booth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setLoading(true);
    IsBoothLoggedIn().then((resp) => {
      if (resp.result) {
        setAdminLoggedIn(true);
      } else {
        setAdminLoggedIn(false);
      }
      setLoading(false);
    });
  }, [path]);

  if (loading) {
    return <PageLoading />;
  } else if (!adminLoggedIn && !loading) {
    return (
      <ErrorC
        code={403}
        msg="Unauthorized"
        href="/boothEntry/login"
        handleText="Login"
      />
    );
  } else {
    return (
      <main className="max-w-screen relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <div className="container-c mb-12 flex h-full gap-8">{children}</div>
      </main>
    );
  }
}
