"use client";
import TriangleBottom from "@/components/ui/TriangleBottom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { BsGear, BsPeople, BsQuestionCircle } from "react-icons/bs";
import { FaCalendar, FaPlusCircle } from "react-icons/fa";
import { FaQq } from "react-icons/fa6";
import { GoSponsorTiers } from "react-icons/go";
import { IoIosStar, IoIosStats } from "react-icons/io";
import {
  IoNotificationsCircle,
  IoNotificationsCircleOutline,
} from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineChat } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";

const SideLink = ({
  href,
  children,
  className,
  classNameLi,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLi?: string;
  label: string;
}) => {
  const path = usePathname();
  const active = path === href;
  return (
    <li className={classNameLi + " " + ""}>
      <Link
        href={href}
        className={`group relative grid h-10 w-10 place-items-center rounded-full text-3xl text-white/70 hover:text-white ${active ? "bg-primary-200/20" : ""}`}
      >
        {children}
        <div className="absolute -top-[40%] left-[120%] z-30 grid h-[60px] origin-bottom scale-0 place-items-center rounded-lg bg-primary-550 p-2 px-4 text-center text-sm text-white/75 transition group-hover:scale-100">
          {label}
        </div>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="mt-[100px] min-h-[80vh] w-[50px] shrink-0 basis-[50px] rounded-full bg-gradient-to-b from-primary-550 to-secondary-600 py-1">
      <ul className="flex flex-col items-center gap-2">
        <SideLink href="/admin/" label={"Profile"}>
          <IoIosStats />
        </SideLink>
        <SideLink href="/admin/events" label={"Events"}>
          <RiDashboardFill />
        </SideLink>
        <SideLink href="/admin/ca" label={"CA Applicants"}>
          <LiaChalkboardTeacherSolid />
        </SideLink>
        <SideLink href="/admin/participants" label={"Participants"}>
          <BsPeople />
        </SideLink>

        <SideLink href="/admin/gallery" label={"Gallery"}>
          <BiPhotoAlbum />
        </SideLink>
        <SideLink href="/admin/faq" label={"FAQ"}>
          <BsQuestionCircle />
        </SideLink>
        <SideLink href="/admin/sponsors" label={"Sponsors"}>
          <GoSponsorTiers />
        </SideLink>
        <SideLink href="/admin/message" label={"Messages"}>
          <MdOutlineChat />
        </SideLink>
        <SideLink href="/admin/settings" label={"Settings"}>
          <BsGear />
        </SideLink>
        <SideLink href="/admin/create-user/solo" label={"Add Par"}>
          <FaPlusCircle />
        </SideLink>
        <SideLink href="/admin/schedule" label={"Schedule"}>
          <FaCalendar />
        </SideLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
