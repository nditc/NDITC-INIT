import React from "react";

const Teaser = () => {
  return (
    <div className="mb-16 w-full">
      <div className="container-c flex flex-col items-center justify-center gap-6">
        <h2 className="title title-top mb-0">VIDEO TEASER</h2>
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fnditc.official%2Fvideos%2F1293678845022159%2F%3Fidorvanity%3D671082895491805&show_text=false&width=560&t=0"
          className="aspect-video w-full max-w-[800px] border-0"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default Teaser;
