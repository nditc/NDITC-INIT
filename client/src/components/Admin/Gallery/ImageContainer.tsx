import React, { useContext } from "react";
import ImageCard from "@/components/Admin/Gallery/ImageCard";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import ImageContext from "@/context/ImageContext";
const ImageContainer = () => {
  const images = [
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
    "https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg",
  ]; // temp images for testing
  const [, dispatch] = useContext(ImageContext) || [, () => {}];
  return (
    <div className="my-10 flex flex-col gap-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4 text-primary-200/70">
          <h2 className="Inter text-center text-2xl font-extrabold md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
            Photos
          </h2>
          {/* <button className="shadow-md">
            <FiEdit className="text-2xl" />
          </button>
          <button className="shadow-md">
            <MdDelete className="text-3xl text-red-600" />
          </button> */}
        </div>

        <button
          onClick={() => {
            dispatch({ type: "ADD", state: true });
          }}
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full md:text-xl"
        >
          <IoAdd className="box-content rounded-full bg-secondary-400 p-1" />{" "}
          Add Photo
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {images.map((image, key) => (
          <ImageCard image={image} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
