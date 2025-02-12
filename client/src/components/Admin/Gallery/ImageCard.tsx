import ImageContext from "@/context/ImageContext";
import React, { useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
interface ImageCardProps {
  image: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [, dispatch] = useContext(ImageContext) || [, () => {}];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div className="group relative h-full w-full">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "EDIT", state: true, data: "ok" });
            }}
            className="pointer-events-auto"
          >
            <FiEdit className="text-1xl" />
          </button>
          <button className="pointer-events-auto">
            <MdDelete className="text-2xl text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
