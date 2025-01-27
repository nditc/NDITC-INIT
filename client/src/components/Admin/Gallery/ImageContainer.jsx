import React from 'react';
import ImageCard from '@/components/Admin/Gallery/ImageCard'
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
const ImageContainer = () => {
    
  const images = ["https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg","https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"]; // temp images for testing

    return (
        <div className='flex flex-col gap-6 my-10 px-[2%]'>
            <div className="flex items-center justify-between ">
                <div className='flex gap-4 items-center'>
                    <h2 className="Inter text-2xl text-center lg:text-4xl font-extrabold md:text-3xl lg:mb-0 lg:mt-0 lg:text-left">
                        Champions
                    </h2>
                    <button className='shadow-md'>
                        <FiEdit className='text-2xl' />
                    </button>
                    <button className='shadow-md'>
                        <MdDelete className='text-3xl text-red-600' />
                    </button>
                </div>


                <Link href="#" className="cursor-pointer flex items-center gap-2 rounded-full md:text-xl">
                    <IoAdd className='rounded-full bg-secondary-400 p-1 box-content' /> Add Photo
                </Link>


            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {images.map((image, key) => <ImageCard image={image} key={key} />)}
            </div>
        </div>
    );
};

export default ImageContainer;