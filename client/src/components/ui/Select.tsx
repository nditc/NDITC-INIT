// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  notRequired?: boolean;
  divClass?: string;
  values: string[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, name, notRequired, divClass, values, ...props },
    ref,
  ) => {
    const radius = 150; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--primary-150),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={
          "group/input rounded-full p-[2px] transition duration-300" +
          " " +
          divClass
        }
      >
        <div className="rounded-full bg-secondary-100 px-1">
          <label
            className="pl-6 pt-2 text-xs font-medium leading-none text-secondary-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={name}
          >
            {label}
            {notRequired ? " (Optional)" : ""}:
          </label>
          <select
            required={!notRequired}
            name={name}
            className={cn(
              `dark:placeholder-text-neutral-600 duration-400 flex h-9 w-[96%] rounded-full border-none bg-transparent px-6 py-2 text-sm text-black shadow-input outline-none transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:text-white`,
              className,
            )}
            ref={ref}
            {...props}
          >
            {values.map((val, index) => (
              <option value={val} key={index} className="bg-primary-600">
                {val}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
    );
  },
);
Select.displayName = "Select";

export { Select };
