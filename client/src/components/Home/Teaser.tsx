import React from "react";

const Teaser = () => {
  return (
    <div className="mb-16 w-full">
      <div className="container-c flex flex-col items-center gap-6">
        <h2 className="title title-top mb-0">VIDEO TEASER</h2>

        <div className="w-full max-w-[560px]">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1966138250778744%2F&show_text=false&t=0"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teaser;
