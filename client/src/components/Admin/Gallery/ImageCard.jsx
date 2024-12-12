import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const ImageCard = ({image}) => {
    return (
        <div className="w-full rounded-2xl overflow-hidden relative" >
            <div className="relative w-full h-full group">
              <img
                src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="top-2 right-2 z-10 absolute flex items-center gap-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                <button className="pointer-events-auto">
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