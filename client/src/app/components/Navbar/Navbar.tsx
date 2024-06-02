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
    <nav className="fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            className="hidden md:flex relative items-center justify-center"
            onClick={() => {
              if (resolvedTheme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {resolvedTheme === "dark" ? (
              <BsMoonStarsFill className={`w-7 h-7 absolute`} />
            ) : (
              <BsSun className={`w-7 h-7 absolute bg=[##9A9AE3]`} />
            )}
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:bg-white/15 dark:backdrop-blur-lg"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
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
          className={`transition bg-white/15 backdrop-blur-md text-black dark:text-white px-5 py-3 rounded-xl md:rounded-full items-center justify-between ${
            expanded ? "scale-100" : "scale-0"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Executives
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Gallery
              </a>
            </li>

            <li className="md:hidden mt-9 mb-3">
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
                  <BsMoonStarsFill className={`w-7 h-7 absolute`} />
                ) : (
                  <BsSun className={`w-7 h-7 absolute bg=[##9A9AE3]`} />
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
