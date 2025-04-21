"use client";

import { useRouter, usePathname } from "next/navigation";

interface RouteOption {
  label: string;
  path: string;
}

interface RouteSwitchProps {
  options: RouteOption[];
  className?: string;
}

export default function RouteSwitch({
  options,
  className = "",
}: RouteSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={
        "bg-background mx-auto flex max-w-[450px] rounded-lg border border-white/25 p-1 " +
        className
      }
    >
      {options.map((option) => {
        const isActive = pathname === option.path;
        return (
          <button
            key={option.path}
            onClick={() => handleRouteChange(option.path)}
            className={
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 " +
              (isActive
                ? "bg-primary-400 text-white shadow-sm"
                : "hover:bg-muted text-white hover:text-white/60")
            }
            aria-current={isActive ? "page" : undefined}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
