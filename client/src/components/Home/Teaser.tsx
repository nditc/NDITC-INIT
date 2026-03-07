import React from "react";

const Teaser = () => {
  return (
    <div className="mb-16 w-full">
      <div className="container-c flex flex-col items-center gap-6">
        <h2 className="title title-top mb-0">VIDEO TEASER</h2>

        <div className="w-full max-w-[944px]">
          <div className="relative w-full pb-[56.25%]">
            <iframe className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/sESUXoL2rbQ" title="INIT 6.0 - Official Teaser" 
            frameBorder="0"
            style={{ border: "none", overflow: "hidden" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teaser;
