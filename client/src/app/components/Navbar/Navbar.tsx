"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div />;

  return (
    <nav className="fixed start-0 top-0 z-20 w-full">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={
              resolvedTheme === "dark"
                ? "/INIT_Icon.svg"
                : "/INIT_Icon_White.svg"
            }
            className="h-14 pt-1"
            alt="Logo"
          />
        </a>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button
            className="relative hidden items-center justify-center md:flex"
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
          className={`items-center justify-between rounded-xl bg-white/15 px-5 py-3 text-black backdrop-blur-md transition dark:text-white md:rounded-full ${
            expanded ? "scale-100" : "scale-0"
          } w-full md:order-1 md:flex md:w-auto md:scale-100`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Executives
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Gallery
              </a>
            </li>

            <li className="mb-3 mt-9 md:hidden">
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
