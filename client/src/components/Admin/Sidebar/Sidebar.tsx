"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineChat } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";

const SideLink = ({
  href,
  children,
  className,
  classNameLi,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLi?: string;
}) => {
  const path = usePathname();
  const active = path === href;
  return (
    <li className={classNameLi}>
      <Link
        href={href}
        className={`grid h-10 w-10 place-items-center rounded-full text-3xl text-white/70 hover:text-white ${active ? "bg-primary-200/20" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="mt-[100px] max-h-[80vh] w-[50px] rounded-full bg-gradient-to-b from-primary-550 to-secondary-600 py-1">
      <ul className="flex flex-col items-center gap-2">
        <SideLink href="/admin/gallery">
          <RiDashboardFill />
        </SideLink>
        <SideLink href="/admin/messages">
          <MdOutlineChat />
        </SideLink>
        <SideLink href="/admin/gallery">
          <RiDashboardFill />
        </SideLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
