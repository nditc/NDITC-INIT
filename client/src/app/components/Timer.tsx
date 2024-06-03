"use client";

const Timer = () => {
  return (
    <section className="relative flex h-[30vh] w-full flex-col items-center md:h-[60vh]">
      <img
        src="./Timer Text.svg"
        className="absolute right-3 top-0 w-[46%] opacity-50 md:w-fit"
        alt="Code Text"
      />

      <div className="h-1 w-[90%] rounded-full bg-[#4E4383] md:w-[46%]"></div>
    </section>
  );
};

export default Timer;
