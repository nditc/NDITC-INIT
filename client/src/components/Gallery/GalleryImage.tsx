"use client";

import { reqImgWrapper } from "@/app/data/requests";

const GalleryImage = ({ item, keyVal }: { item: any; keyVal: number }) => {
  return (
    <figure className={`image-${keyVal}`} onClick={() => {}}>
      <a href="https://picsum.photos/1600/1200/?4" data-featherlight="image">
        <img loading="lazy" src={reqImgWrapper(item.thumbnail)?.toString()} />
        <figcaption>{`Image ${keyVal}`}</figcaption>
      </a>
    </figure>
  );
};

export default GalleryImage;
