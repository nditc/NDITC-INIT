"use clieny";

const Timer = () => {
  return (
    <section className="w-full h-[30vh] flex flex-col items-center md:h-[60vh] relative">
      <img
        src="./Timer Text.svg"
        className="absolute right-3 w-[46%] top-0 md:w-fit opacity-50"
        alt="Code Text"
      />

      <div className="w-[90%] md:w-[46%] rounded-full h-1 bg-[#4E4383]"></div>
    </section>
  );
};

export default Timer;
