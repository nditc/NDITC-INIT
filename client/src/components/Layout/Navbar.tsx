"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import ExtendedColors from "../../../color.config";
import useUser from "@/hooks/useUser";

let scrollTop = 0;

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={
          "block rounded-full px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-primary-450 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-primary-450 md:dark:hover:bg-transparent md:dark:hover:text-secondary-200/90 " +
          (path === href ? "dark:md:text-secondary-200/90" : "text-white")
        }
      >
        {children}
      </Link>
    </li>
  );
};

const ProfileLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [userExpanded, setUserExpanded] = useState(false);
  const [showLoader, setLoader] = useState(true);
  const animationDuration = 1.5;

  const [user] = useUser();

  const navRef = useRef<HTMLElement>(null);
  const navItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (
        navRef.current &&
        e.target instanceof Node &&
        !navRef.current.contains(e.target)
      ) {
        setExpanded(false);
        setUserExpanded(false);
      }
    };

    const scrollHandler = () => {
      if (navRef.current && navItem.current) {
        if (scrollTop - window.scrollY > 0) {
          navRef.current.style.translate = "0 0";
        } else if (window.scrollY > 450) {
          // navRef.current.style.backgroundColor =
          //   ExtendedColors.secondary[700] + "F5";
          // navRef.current.style.backdropFilter = "blur(18px)";
          // navRef.current.style.boxShadow =
          //   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
          // navItem.current.style.backgroundColor = "transparent";
          navRef.current.style.translate = "0 -100%";
        } else {
          // navRef.current.style.backgroundColor = "transparent";
          // navRef.current.style.boxShadow = "none";
          // navRef.current.style.backdropFilter = "blur(0px)";
          // navItem.current.style.backgroundColor = ExtendedColors.secondary[600];
          navRef.current.style.translate = "0 0";
        }
        scrollTop = window.scrollY;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("scroll", scrollHandler);

    setMounted(true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!mounted)
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <nav
      className="fixed start-0 top-0 z-[1000] w-full transition-all"
      ref={navRef}
    >
      {showLoader && (
        <div className="flex h-screen w-screen">
          <motion.div
            animate={mounted ? { y: "-200vh" } : {}}
            transition={{ duration: animationDuration }}
            className={`h-full w-[20%] bg-slate-950`}
          />

          <motion.div
            animate={mounted ? { y: "-200vh" } : {}}
            transition={{ delay: 0.2, duration: animationDuration }}
            className={`h-full w-[20%] bg-slate-950`}
          />

          <motion.div
            animate={mounted ? { y: "-200vh" } : {}}
            transition={{ delay: 0.3, duration: animationDuration }}
            className={`h-full w-[20%] bg-slate-950`}
          />

          <motion.div
            animate={mounted ? { y: "-200vh" } : {}}
            transition={{ delay: 0.4, duration: animationDuration }}
            className={`h-full w-[20%] bg-slate-950`}
          />

          <motion.div
            animate={mounted ? { y: "-200vh" } : {}}
            transition={{ delay: 0.5, duration: animationDuration }}
            className={`h-full w-[20%] bg-slate-950`}
            onAnimationComplete={() => setLoader(false)}
          />
        </div>
      )}
      <div
        className={`${!showLoader ? "opacity-100" : "opacity-0"} mx-auto flex max-h-24 max-w-screen-xl flex-wrap items-center justify-between p-4 transition-all duration-200`}
      >
        <Link
          href="/"
          className="flex grow basis-0 items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={
              resolvedTheme === "dark"
                ? "/INIT_Icon.svg"
                : "/INIT_Icon_White.svg"
            }
            className="w-20 rounded pt-1"
            alt="Logo"
          />
        </Link>
        <div className="relative flex justify-end space-x-3 md:order-2 md:space-x-0 lg:grow lg:basis-0 rtl:space-x-reverse">
          {!user ? (
            <button
              onClick={() => {
                setUserExpanded(!userExpanded);
                setExpanded(false);
              }}
              type="button"
              className="before:ease Inter font-ShareTechTown group relative flex items-center overflow-hidden rounded-full bg-primary-300 px-4 py-3 text-center text-sm font-medium text-white shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary-450 before:transition-all before:duration-300 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:px-2 xl:px-4"
            >
              <span className="relative z-10 mr-2 hidden pl-3 sm:inline">
                PROFILE
              </span>
              <FiUser className="z-10 h-5 w-5 xsm:h-4 xsm:w-4 lg:mr-2" />{" "}
            </button>
          ) : (
            <Link
              href="/login"
              type="button"
              className="before:ease Inter font-ShareTechTown group relative flex items-center overflow-hidden rounded-full bg-primary-300 py-2 pl-4 pr-4 text-center text-sm font-medium text-white shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary-450 before:transition-all before:duration-300 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:px-2 xl:px-4"
            >
              <span className="relative z-10 mr-1 hidden transition group-hover:translate-x-3 sm:inline">
                LOGIN
              </span>
              <LuLogIn className="z-10 h-5 w-5 opacity-50 transition group-hover:translate-x-10 sm:h-4 sm:w-4 lg:mr-2" />
            </Link>
          )}

          {user && (
            <div
              className={
                "absolute right-0 top-7 z-50 my-4 origin-top-right list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow transition dark:divide-primary-250/20 dark:bg-primary-550 " +
                (userExpanded ? "scale-100" : "pointer-events-none scale-0")
              }
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block truncate text-sm text-gray-300/60">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <ProfileLink href="#">Dashboard</ProfileLink>
                <ProfileLink href="#">Settings</ProfileLink>
                <ProfileLink href="#">Sign out</ProfileLink>

                {/* <li className="mb-5 mt-7">
                  <button
                    className="relative left-6 flex items-center justify-center"
                    onClick={() => {
                      if (resolvedTheme === "dark") {
                        setTheme("light");
                      } else {
                        setTheme("dark");
                      }
                    }}
                  >
                    {resolvedTheme === "dark" ? (
                      <BsMoonStarsFill className={`absolute h-6 w-6`} />
                    ) : (
                      <BsSun className={`bg=[##9A9AE3] absolute h-6 w-6`} />
                    )}
                  </button>
                </li> */}
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              setExpanded(!expanded);
              setUserExpanded(false);
            }}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-white/15 dark:text-gray-400 dark:backdrop-blur-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          ref={navItem}
          style={{ transformOrigin: "top" }}
          className={`items-center justify-between rounded-xl px-14 text-black transition dark:bg-secondary-600 dark:text-white md:rounded-full md:py-3 ${
            expanded
              ? "scale-100"
              : "pointer-events-none scale-0 md:pointer-events-auto"
          } w-full md:order-1 md:flex md:w-auto md:scale-100`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col rounded-lg p-4 text-center font-medium md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/executives">Executives</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
