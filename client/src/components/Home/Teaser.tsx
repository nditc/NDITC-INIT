import React from "react";

const Teaser = () => {
  return (
    <div className="mb-16 w-full">
      <div className="container-c flex flex-col items-center justify-center gap-6">
        <h2 className="title title-top mb-0">VIDEO TEASER</h2>
        <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1966138250778744%2F&show_text=false&width=560&t=0" width="560" height="314" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
    </div>
  );
};

export default Teaser;
