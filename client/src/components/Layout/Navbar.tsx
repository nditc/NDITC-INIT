"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  console.log(path, href, path === href);
  return (
    <li>
      <Link
        href={href}
        className={
          "block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-primary-450 md:dark:hover:bg-transparent md:dark:hover:text-secondary-200/90 " +
          (path === href ? "dark:md:text-secondary-200/90" : "text-white")
        }
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
  const [showLoader, setLoader] = useState(true);
  const animationDuration = 1.5;

  useEffect(() => setMounted(true), []);

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
    <nav className="fixed start-0 top-0 z-20 w-full">
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
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={
              resolvedTheme === "dark"
                ? "/INIT_Icon.svg"
                : "/INIT_Icon_White.svg"
            }
            className="w-20 pt-1"
            alt="Logo"
          />
        </Link>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button
            className="relative hidden items-center justify-center md:flex md:w-20 md:justify-end"
            onClick={() => {
              if (resolvedTheme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {resolvedTheme === "dark" ? (
              <BsMoonStarsFill className={`absolute h-7 w-7`} />
            ) : (
              <BsSun className={`bg=[##9A9AE3] absolute h-7 w-7`} />
            )}
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
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
          style={{ transformOrigin: "top" }}
          className={`items-center justify-between rounded-xl px-14 py-3 text-black transition dark:bg-secondary-600 dark:text-white md:rounded-full ${
            expanded
              ? "scale-100"
              : "pointer-events-none scale-0 md:pointer-events-auto"
          } w-full md:order-1 md:flex md:w-auto md:scale-100`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg p-4 text-center font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/executives">Executives</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <li className="mb-5 mt-9 md:hidden">
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
                  <BsMoonStarsFill className={`absolute h-7 w-7`} />
                ) : (
                  <BsSun className={`bg=[##9A9AE3] absolute h-7 w-7`} />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;