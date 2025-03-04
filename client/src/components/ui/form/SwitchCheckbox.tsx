import React from "react";

const SwitchCheckbox = (
  props: React.HTMLProps<HTMLInputElement> & { divClass?: string },
) => {
  return (
    <div className="flex w-full flex-col items-center gap-1 md:w-auto md:flex-row md:gap-3">
      <input
        {...props}
        id={props.name}
        type="checkbox"
        className="toggle-checkbox"
      />
      {props.label ? (
        <label htmlFor={props.name} className="text-sm text-white md:text-base">
          {props.label}
        </label>
      ) : null}
    </div>
  );
};

export default SwitchCheckbox;
