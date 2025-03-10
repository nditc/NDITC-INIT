import React, { useEffect, useState } from "react";

const TextArea = (
  props: React.HTMLProps<HTMLTextAreaElement> & { divClass?: string },
) => {
  const [isOnFocus, setFocus] = useState(false);
  useEffect(() => {
    if (props.defaultValue) {
      setFocus(true);
    }
  }, [props.defaultValue, props.type]);
  return (
    <div
      className={`relative w-full ${props.divClass} resize-none scroll-pt-7 rounded-[1.75rem] bg-gradient-to-r from-secondary-400/30 to-secondary-600 px-8 pb-3 pt-7 transition placeholder:text-transparent autofill:bg-transparent autofill:bg-gradient-to-r autofill:from-secondary-400 autofill:to-secondary-500 hover:opacity-85`}
    >
      <textarea
        id={props.name}
        {...props}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={(e) => {
          if (e.currentTarget.value === "") {
            setFocus(false);
          }
        }}
        autoComplete="false"
        className={`peer focus:outline-none ${props.className} w-full resize-none bg-transparent`}
      ></textarea>
      <label
        htmlFor={props.name}
        className={`pointer-events-none absolute left-8 z-10 -translate-y-1/2 transition-all peer-autofill:top-5 peer-autofill:text-xs peer-autofill:text-secondary-200 ${isOnFocus ? "top-5 text-xs text-secondary-200" : "top-8 text-white/50"}`}
      >
        {props.label}{" "}
        <span className="text-red-400">{props.required ? "*" : ""}</span>
      </label>
    </div>
  );
};

export default TextArea;
