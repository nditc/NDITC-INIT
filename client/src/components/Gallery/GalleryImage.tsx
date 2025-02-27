"use client";

import { reqImgWrapper } from "@/api/requests";

const GalleryImage = ({
  item,
  keyVal,
  openModal,
}: {
  item: any;
  keyVal: number;
  openModal: () => void;
}) => {
  return (
    <figure className={`image-${keyVal}`} onClick={openModal}>
      <a data-featherlight="image">
        <img
          alt=""
          loading="lazy"
          src={reqImgWrapper(item.BigImage)?.toString()}
        />
        <figcaption>{`Image ${keyVal}`}</figcaption>
      </a>
    </figure>
  );
};

export default GalleryImage;
