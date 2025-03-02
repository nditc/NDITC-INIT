import React, { useEffect, useRef, useState } from "react";

const Input = (
  props: React.HTMLProps<HTMLInputElement> & { divClass?: string },
) => {
  const [isOnFocus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.defaultValue || props.type === "date") {
      setFocus(true);
    }

    if (props.type === "date" && props.defaultValue && inputRef.current) {
      inputRef.current.value = String(props.defaultValue);
    }
  }, [props.defaultValue, props.type]);
  return (
    <div className={"relative " + props.divClass}>
      <input
        ref={inputRef}
        id={props.name}
        {...props}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={(e) => {
          if (e.currentTarget.value === "" && props.type !== "date") {
            setFocus(false);
          }
        }}
        className={`peer w-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500 px-8 pb-3 pt-7 transition placeholder:text-transparent hover:opacity-85 focus:outline-none ${props.className} autofill:bg-transparent autofill:bg-gradient-to-r autofill:from-secondary-400 autofill:to-secondary-500`}
      ></input>
      <label
        htmlFor={props.name}
        className={`pointer-events-none absolute left-8 z-10 -translate-y-1/2 transition-all peer-autofill:top-5 peer-autofill:text-xs peer-autofill:text-secondary-200 ${isOnFocus ? "top-5 text-xs text-secondary-200" : "top-1/2 text-sm text-white/50 md:text-base"}`}
      >
        {props.label}{" "}
        <span className="text-red-400">{props.required ? "*" : ""}</span>
      </label>
    </div>
  );
};

export default Input;
