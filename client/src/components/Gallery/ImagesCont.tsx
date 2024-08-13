"use client";
import { reqImgWrapper } from "@/api/requests";
import React, { useState } from "react";
import GalleryImage from "./GalleryImage";
import ImageViewer from "./ImageViewer";

const ImagesCont = ({ images }: { images: any[] }) => {
  const [index, setIndex] = useState<number>(-1);
  return (
    <>
      <section className="gallery grid-gallery px-1 md:px-10">
        {images.map((item: any, key: number) => {
          if (key != 0) {
            return (
              <GalleryImage
                keyVal={key}
                key={key}
                item={item}
                openModal={() => setIndex(key + 1)}
              />
            );
          }
        })}
      </section>
      <ImageViewer
        state={index >= 0}
        close={() => setIndex(-1)}
        initIndex={index}
        images={images.map(
          ({ BigImage }: any) => reqImgWrapper(BigImage) || "",
        )}
      />
    </>
  );
};

export default ImagesCont;
