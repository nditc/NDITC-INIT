import React from "react";

type props = {
  name: string;
  label: string;
  values: string[];
  selected: string | number;
  setValue: (name: string, data: string | number) => void;
  editable?: boolean;
};
const Select = ({
  name,
  label,
  values,
  selected,
  setValue,
  editable = true,
}: props) => {
  return (
    <div className="">
      <label
        className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
        htmlFor={name}
      >
        {label}
      </label>

      <select
        style={{
          pointerEvents: editable ? "auto" : "none",
        }}
        className="focus:border-primary dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md px-5 py-2 focus:outline-none dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600"
        name={name}
        value={selected}
        onChange={(e) => setValue(name, e.target.value)}
        disabled={!editable}
        title="class"
      >
        {values.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
